interface Props {
  resultado: number | null;
}

export const Resultado = ({ resultado }: Props) => {
  if (resultado === null) return null;

  return (
    <div className="mt-6 text-lg font-semibold text-center">
      Impuesto estimado:{" "}
      {resultado.toLocaleString("es-EC", {
        style: "currency",
        currency: "USD",
      })}
    </div>
  );
};