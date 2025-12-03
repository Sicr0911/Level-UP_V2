describe('PagCarrito - Lógica de Visualización y Cálculo', function() {
  
  const productoCatan = { code: 'JM001', name: 'Catan', priceCLP: 29990, category: 'Juegos de Mesa' };
  const productoCarcassonne = { code: 'JM002', name: 'Carcassonne', priceCLP: 24990, category: 'Juegos de Mesa' };
  
  const itemsMultiples = [
    { producto: productoCatan, cantidad: 1 },
    { producto: productoCarcassonne, cantidad: 1 }
  ];

  it('Debe mostrar el mensaje de carrito vacío si no hay ítems', function() {
    const { getByText, queryByText } = render(<PagCarrito items={[]} />);

    expect(getByText('Tu carrito está vacío. ¡Es hora de subir de nivel tus compras!')).toBeTruthy();
    expect(queryByText('Finalizar Compra')).toBeFalsy();
  });

  it('Debe calcular el total de la compra para diferentes ítems', function() {
    const { getByText } = render(<PagCarrito items={itemsMultiples} />);
    
    expect(getByText('$54.980 CLP')).toBeTruthy();
  });

  it('Debe multiplicar el precio por la cantidad de un mismo producto', function() {
    const itemsCatanDoble = [{ producto: productoCatan, cantidad: 2 }];
    
    const { getByText } = render(<PagCarrito items={itemsCatanDoble} />);
    
    expect(getByText('$59.980 CLP')).toBeTruthy();
    expect(getByText('Cantidad: x2')).toBeTruthy();
  });
  
  it('Debe mostrar el Total a Pagar con el símbolo y formato CLP', function() {
    const { getByText } = render(<PagCarrito items={itemsMultiples} />);
    const totalElement = getByText(/Total a Pagar/i).querySelector('span');

    expect(totalElement.textContent).toMatch(/^\$\d{1,3}\.\d{3} CLP$/);
  });
  
  it('Debe verificar que el botón Finalizar Compra tenga el color Verde Neón', function() {
    const { getByText } = render(<PagCarrito items={itemsMultiples} />);
    const checkoutButton = getByText('Finalizar Compra');

    expect(checkoutButton.style.backgroundColor).toBe('rgb(57, 255, 20)');
  });

  it('Debe verificar que el borde de la página use el color Azul Eléctrico', function() {
    const { container } = render(<PagCarrito items={itemsMultiples} />);
    const mainContainer = container.firstChild;

    expect(mainContainer.style.borderColor).toBe('rgb(30, 144, 255)');
  });
});