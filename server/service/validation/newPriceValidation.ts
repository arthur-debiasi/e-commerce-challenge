const OK_MSG = 'OK';

export const financeValidation = (costPrice: string, newSalePrice: string) => {
  if (!Number(costPrice)) return 'Produto não encontrado';
  if (!Number(newSalePrice)) return 'Novo Preço de Venda não informado';
  const MSG = `O novo preço de venda (${newSalePrice}) precisa ser, no mínimo, ${costPrice}(custo)`;
  if (Number(newSalePrice) < Number(costPrice)) return MSG;
  return OK_MSG;
};

export const marketingValidation = (currentSalePrice: string, newSalePrice: string) => {
  if (!Number(currentSalePrice)) return 'Produto não encontrado';
  if (!Number(newSalePrice)) return 'Novo Preço de Venda não informado';
  const minPrice = (Number(currentSalePrice) * 0.9).toFixed(2);
  const maxPrice = (Number(currentSalePrice) * 1.1).toFixed(2);
  const IS_HIGHER_MSG = `O novo preço de venda (${newSalePrice}) precisa ser maior que ${minPrice}`;
  const IS_LOWER_MSG = `O novo preço de venda (${newSalePrice}) precisa ser menor que ${maxPrice}`;
  const isHigher = Number(newSalePrice) >= 0.9 * Number(currentSalePrice);
  const isLower = Number(newSalePrice) <= 1.1 * Number(currentSalePrice); 
  if (!isHigher) return IS_HIGHER_MSG;
  if (!isLower) return IS_LOWER_MSG;
  return OK_MSG;
};
