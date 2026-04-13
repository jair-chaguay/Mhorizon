<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #151E28;
            line-height: 1.5;
        }

        .container {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 25px;
            max-width: 600px;
            margin: 0 auto;
        }

        .alerta {
            color: #d97706;
            font-weight: bold;
            font-size: 16px;
        }

        .boton {
            background-color: #f97316;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
            font-weight: bold;
        }

        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            padding-top: 15px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Hola, {{ $admin->nombre }} {{ $admin->apellido }}</h2>

        <p>Este es un recordatorio automático del portal.</p>

        <p class="alerta">Se necesita subir la obligación tributaria correspondiente a:</p>

        <ul style="background-color: #f9fafb; padding: 15px 35px; border-radius: 5px;">
            <li><strong>Cliente:</strong> {{ $obligacion->cliente->razon_social_nombres }}</li>
            <li><strong>RUC/Cédula:</strong> {{ $obligacion->cliente->identificacion }}</li>
            <li><strong>Tipo de Impuesto:</strong> {{ $obligacion->tipo_impuesto }}</li>
            <li><strong>Periodo:</strong> {{ $obligacion->fecha_presentacion }}</li>
            <li><strong style="color: red;">FECHA LÍMITE:</strong> {{ \Carbon\Carbon::parse($obligacion->fecha_vencimiento_exacta)->format('d/m/Y') }}</li>
        </ul>

        <p>Por favor, ingresa al gestor documental, sube el archivo correspondiente y marca la obligación como "Presentada" para detener estas notificaciones.</p>

        <a href="{{ url('/') }}" class="boton">Ir al Gestor Documental</a>

        <div class="footer">
            Nota: Este correo se enviará diariamente hasta que la obligación sea marcada como Presentada.
        </div>
    </div>
</body>

</html>