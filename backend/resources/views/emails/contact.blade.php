<h2>Nueva solicitud de cupo desde la web</h2>
<p><strong>Programa:</strong> {{ $data['programa'] }}</p>
<p><strong>Nombre completo:</strong> {{ $data['nombre'] }} {{ $data['apellido'] }}</p>
<p><strong>Email de contacto:</strong> {{ $data['email'] }}</p>
<hr>
<p><strong>Mensaje:</strong></p>
<p>{{ $data['mensaje'] ?? 'Sin mensaje adicional.' }}</p>