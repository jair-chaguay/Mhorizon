@component('mail::message')

#  Reporte Tributario

Gracias por utilizar nuestra calculadora.

---

##  Datos del contribuyente

- **Tipo:** {{ $registro->tipo_contribuyente }}
- **Régimen RIMPE:** {{ $registro->regimen ? 'Sí' : 'No' }}

---

##  Resultados del cálculo

@component('mail::table')
| Concepto            | Valor |
|---------------------|-------|
| Base imponible      | ${{ number_format($resultados['base'], 2) }} |
| Impuesto causado    | ${{ number_format($resultados['causado'], 2) }} |
| Rebaja              | ${{ number_format($resultados['rebaja'], 2) }} |
| **Total a pagar**   | **${{ number_format($resultados['pagar'], 2) }}** |
@endcomponent

---

@component('mail::panel')
Este cálculo es referencial. Consulte con su asesor tributario.
@endcomponent

Gracias,<br>
**Mhorizon**

@endcomponent