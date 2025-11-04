describe('descripcionProducto - Interacción y DOM', function() {

  const testProducto = {
    code: 'TEST01',
    nombre: 'Controlador de Prueba',
    categoria: 'Accesorios',
    precio: 59990,
    descripcion: 'Un controlador para pruebas unitarias.',
  };

  it('Debe llamar a onAddToCart con el producto correcto al hacer clic', function() {
    const mockOnAddToCart = jasmine.createSpy('onAddToCartSpy');

    const { getByText, fireEvent } = render(
      <descripcionProducto producto={testProducto} onAddToCart={mockOnAddToCart} />
    );

    const boton = getByText('Añadir al Carrito'); 
    fireEvent.click(boton);

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
    expect(mockOnAddToCart).toHaveBeenCalledWith(testProducto);
  });

  it('Debe mostrar el nombre y el precio formateado correctamente en el DOM', function() {
    const { getByText } = render(
      <descripcionProducto producto={testProducto} onAddToCart={() => {}} />
    );

    expect(getByText('Controlador de Prueba')).toBeTruthy(); 
    expect(getByText('$59.990 CLP')).toBeTruthy();
    expect(getByText('Categoría: Accesorios')).toBeTruthy(); 
  });
});