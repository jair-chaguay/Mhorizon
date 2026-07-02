<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
        .header { background-color: #D98005; color: white; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; }
        .score-box { background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; border-radius: 8px; color: #1e3a8a; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 10px; border-bottom: 1px solid #ddd; text-align: left; font-size: 14px; }
        th { background-color: #f9fafb; color: #6b7280; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Alerta: Nueva Calificación de Servicio</h2>
        </div>
        
        <p>Hola,</p>
        <p>El cliente <strong>{{ $cliente->razon_social_nombres }}</strong> (RUC/CI: {{ $cliente->identificacion }}) acaba de completar la encuesta de satisfacción en la Intranet.</p>

        <div class="score-box">
            Score Obtenido: {{ $scoreTotal }} / 100
        </div>

        <h3>Detalle de las Respuestas:</h3>
        <table>
            <thead>
                <tr>
                    <th>Pregunta</th>
                    <th>Calificación</th>
                    <th>Puntos Ganados</th>
                </tr>
            </thead>
            <tbody>
                @foreach($detalleRespuestas as $detalle)
                <tr>
                    <td>{{ $detalle['enunciado'] }}</td>
                    <td style="text-align: center;"><strong>{{ $detalle['valor_seleccionado'] }}/5</strong></td>
                    <td style="text-align: center;">{{ $detalle['puntos_obtenidos'] }} / {{ $detalle['peso_maximo'] }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
        @if($comentario)
            <div style="margin-top: 20px; background-color: #fffbeb; padding: 15px; border-left: 4px solid #D98005; border-radius: 4px;">
                <h4 style="margin-top: 0; color: #D98005;">Comentario / Recomendación del Cliente:</h4>
                <p style="margin-bottom: 0; font-style: italic;">"{{ $comentario }}"</p>
            </div>
        @endif

        <p style="margin-top: 30px; font-size: 12px; color: #999; text-align: center;">
            Este es un mensaje automático generado por MHorizon Portal.
        </p>
    </div>
</body>
</html>