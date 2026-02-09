export const formatCurrency = (value: number, locale = 'pt-BR', currency = 'BRL') => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}

export const formatDate = (iso: string) => {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat('pt-BR').format(d);
  } catch {
    return iso;
  }
}

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
  return re.test(email);
}
