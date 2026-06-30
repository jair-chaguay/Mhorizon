<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Mail;
use App\Mail\AlertaScoreCliente;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Models\Usuario;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Facades\Hash; 
use Illuminate\Support\Facades\Gate;

class ClienteController extends Controller
{
    public function index()
    {
        $clientes = Cliente::with('gestores', 'usuarios')
                           ->orderBy('razon_social_nombres', 'asc')
                           ->get();

        return response()->json([
            'clientes' => $clientes,
            'status' => 200
        ], 200);
    }

    public function indexBiblioteca()
    {
        $clientes = Cliente::withTrashed()
                           ->with('gestores', 'usuarios')
                           ->orderBy('razon_social_nombres', 'asc')
                           ->get();

        return response()->json([
            'clientes' => $clientes,
            'status' => 200
        ], 200);
    }

    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tipo_persona' => 'required|in:Régimen General,RIMPE,Contribuyente Especial,Persona Natural,Entidad Pública',
            'razon_social_nombres' => 'required|string|max:255',
            'identificacion' => 'required|string|max:13|unique:clientes,identificacion',
            'score_tributario' => 'required|integer|min:0|max:100',
            'gestores' => 'required|array|min:1',
            'gestores.*' => 'exists:usuarios,id',
            
            'correo' => 'required|email|max:150|unique:usuarios,correo',
            'password' => 'required|string|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors(), 'status' => 400], 400);
        }

        // 2. Usamos DB Transaction para que si algo falla, no se guarde nada a medias
        DB::beginTransaction();

        try {
            $cliente = Cliente::create([
                'tipo_persona' => $request->tipo_persona,
                'razon_social_nombres' => $request->razon_social_nombres,
                'identificacion' => $request->identificacion,
                'score_tributario' => $request->score_tributario,
            ]);

            $cliente->gestores()->sync($request->gestores);

            // B. Crear el Usuario asociado a ese Cliente
            $usuario = Usuario::create([
                'rol_id' => 2, 
                'cliente_id' => $cliente->id, 
                'nombre' => 'Representante', 
                'apellido' => 'Cliente',     
                'correo' => $request->correo,
                'password_hash' => Hash::make($request->password),
                'activo' => true
            ]);

            DB::commit(); 

            return response()->json([
                'message' => 'Cliente y Usuario creados con éxito', 
                'cliente' => $cliente, 
                'status' => 201
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack(); 
            return response()->json([
                'message' => 'Error interno al crear el cliente', 
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }


    public function show($id)
    {
        $cliente = Cliente::with(['usuarios', 'gestores'])->find($id);

        if (!$cliente) return response()->json(['message' => 'Cliente no encontrado', 'status' => 404], 404);

        return response()->json(['cliente' => $cliente, 'status' => 200], 200);
    }


    public function update(Request $request, $id)
    {
        $cliente = Cliente::find($id);
        if (!$cliente) return response()->json(['message' => 'Cliente no encontrado', 'status' => 404], 404);

        if(!Gate::allows('update', $cliente)){
            return response()->json([
                'message' => 'Acceso denegado. Solo el gestor asignado a este cliente puede modificar datos',
                'status' => 403
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'tipo_persona' => 'sometimes|required|in:Régimen General,RIMPE,Contribuyente Especial,Persona Natural,Entidad Pública',
            'razon_social_nombres' => 'sometimes|required|string|max:255',
            'identificacion' => 'sometimes|required|string|max:13|unique:clientes,identificacion,'.$id,
            'direccion_matriz' => 'nullable|string',
            'score_tributario' => 'sometimes|required|integer|min:0|max:100',
            'correo' => 'sometimes|required|email|max:150',
            'password' => 'nullable|string|min:8',
            'representante' => 'nullable|string|max:200',
            'gestores' => 'sometimes|required|array'
        ]);

        if ($validator->fails()) return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors(), 'status' => 400], 400);

        $cliente->update($request->only(['tipo_persona', 'razon_social_nombres', 'identificacion', 'direccion_matriz', 'score_tributario', 'gestionado_por_id']));

        if ($request->has('gestores')) {
            $cliente->gestores()->sync($request->gestores);
        }
        
        $usuario = \App\Models\Usuario::where('cliente_id', $cliente->id)->first();
        if ($usuario) {
            if ($request->filled('correo')) {
                $usuario->correo = $request->correo;
            }
            if ($request->filled('password')) {
                $usuario->password_hash = Hash::make($request->password);
            }
            if ($request->filled('representante')) {
                $partes = explode(' ', $request->representante, 2);
                $usuario->nombre = $partes[0];
                $usuario->apellido = $partes[1] ?? ''; 
            }
            $usuario->save();
        }

        $cliente->load('usuarios', 'gestores');

        return response()->json(['message' => 'Perfil del cliente actualizado', 'cliente' => $cliente, 'status' => 200], 200);
    }

    public function destroy($id)
    {
        try {
            $cliente = Cliente::withTrashed()->find($id);

            if (!$cliente) {
                return response()->json(['message' => 'Cliente no encontrado', 'status' => 404], 404);
            }

            if ($cliente->trashed()) {
                foreach($cliente->usuarios()->withTrashed()->get() as $usuario) {
                    $usuario->forceDelete(); 
                }
                
                $cliente->forceDelete();

                return response()->json(['message' => 'Cliente eliminado definitivamente del sistema.', 'status' => 200], 200);
            }

            foreach($cliente->usuarios as $usuario) {
                $usuario->delete(); 
            }
            
            $cliente->delete();

            return response()->json(['message' => 'Cliente movido a la papelera (Soft Delete). Documentos conservados.', 'status' => 200], 200);

        } catch (\Illuminate\Database\QueryException $e) {
            // Esto atrapa errores específicos de la base de datos (como llaves foráneas)
            return response()->json([
                'message' => 'No se puede eliminar el cliente porque tiene registros vinculados (Periodos, Documentos, etc).',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error interno del servidor al eliminar.',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }

    public function evaluarScore(Request $request, $id){
        $request->validate([
            'respuestas' => 'required|array|size:5',
            'respuestas.*.pregunta_id' => 'required|exists:pregunta_scores,id',
            'respuestas.*.valor' => 'required|integer|min:1|max:5',
        ]);

        $cliente = Cliente::find($id);
        
        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado', 'status' => 404], 404);
        }

        $scoreTotal = 0;
        $detalleRespuestas = [];

        foreach ($request->respuestas as $respuesta) {
            $pregunta = DB::table('pregunta_scores')->where('id', $respuesta['pregunta_id'])->first();
            
            $puntosObtenidos = ($respuesta['valor'] / 5) * $pregunta->peso_maximo;
            
            $scoreTotal += $puntosObtenidos;

            $detalleRespuestas[] = [
                'pregunta_id' => $pregunta->id,
                'enunciado' => $pregunta->enunciado,
                'peso_maximo' => $pregunta->peso_maximo,
                'valor_seleccionado' => $respuesta['valor'],
                'puntos_obtenidos' => $puntosObtenidos
            ];
        }

        DB::beginTransaction();
        try {
            $cliente->score_tributario = $scoreTotal;
            $cliente->save();

            DB::commit();

            try {
                $correoDestino = env('JEFE_CORREO');
                Mail::to($correoDestino)->send(new AlertaScoreCliente($cliente, $scoreTotal, $detalleRespuestas));
            } catch (\Exception $e) {
                \Log::error('Error al enviar correo de Score: ' . $e->getMessage());
            }

            return response()->json([
                'message' => 'Score calculado y actualizado exitosamente',
                'nuevo_score' => $scoreTotal,
                'status' => 200
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al guardar el score', 
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }
}