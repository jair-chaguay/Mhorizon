@component('mail::message')
# Hola,

Aquí tienes el resumen ejecutivo de tu proyección tributaria generada en nuestra plataforma.

**Perfil Tributario:**
- **Contribuyente:** {{ $registro->tipo_contribuyente }}
- **Régimen:** {{ $registro->regimen ? 'RIMPE' : 'General' }}

---

### Desglose del Cálculo:

| Concepto | Valor |
|:---|---:|
| **Base Imponible:** | ${{ number_format($resultados['base'], 2) }} |
| **Impuesto Causado:** | ${{ number_format($resultados['causado'], 2) }} |

@if($resultados['rebaja'] > 0)
| **Rebaja por Gastos:** | <span style="color: green;">- ${{ number_format($resultados['rebaja'], 2) }}</span> |
@endif

@if($resultados['creditos'] > 0)
| **Créditos Tributarios:** | <span style="color: orange;">- ${{ number_format($resultados['creditos'], 2) }}</span> |
@endif

---

@if($resultados['pagar'] < 0)
### Saldo a Favor: <span style="color: green;">${{ number_format(abs($resultados['pagar']), 2) }}</span>
@else
### Impuesto a Pagar: <span style="color: #D98005;">${{ number_format($resultados['pagar'], 2) }}</span>
@endif

<br>
*Nota: Este cálculo es referencial según los datos proporcionados.*

@component('mail::button', ['url' => 'https://tudominio.com/contacto', 'color' => 'success'])
Hablar con un Asesor
@endcomponent

Gracias por confiar en nosotros, Mhorizon<br>
**{{ config('app.name') }}**
@endcomponent