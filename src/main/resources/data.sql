-- Datos de ejemplo del catálogo de EcoMarket.
-- Se usa INSERT IGNORE con id fijo para que la carga sea idempotente:
-- si los productos ya existen (la tabla persiste con ddl-auto=update), no se duplican.

INSERT IGNORE INTO productos (id, nombre, descripcion, precio, stock, categoria) VALUES
(1, 'Shampoo Sólido Natural', 'Shampoo sin plástico, elaborado con ingredientes naturales', 1800.00, 45, 'Higiene'),
(2, 'Cepillo de Bambú', 'Cepillo de dientes biodegradable de bambú', 950.00, 120, 'Higiene'),
(3, 'Bolsa Reutilizable de Algodón', 'Bolsa de tela orgánica para compras, lavable', 1200.00, 80, 'Hogar'),
(4, 'Vaso Térmico de Acero', 'Vaso reutilizable de acero inoxidable, 500ml', 4500.00, 30, 'Hogar'),
(5, 'Jabón Artesanal de Lavanda', 'Jabón natural hecho a mano con aceites esenciales', 1100.00, 60, 'Higiene'),
(6, 'Set de Sorbetes Metálicos', 'Sorbetes reutilizables de acero con cepillo de limpieza', 1600.00, 50, 'Cocina'),
(7, 'Esponja Vegetal Lufa', 'Esponja natural y compostable para el baño', 700.00, 90, 'Higiene'),
(8, 'Compostera Doméstica', 'Recipiente para compostaje de residuos orgánicos en el hogar', 8900.00, 15, 'Jardín'),
(9, 'Detergente Biodegradable', 'Detergente concentrado libre de fosfatos, 1L', 2100.00, 40, 'Limpieza'),
(10, 'Velas de Cera de Soja', 'Velas aromáticas naturales sin parafina', 2500.00, 35, 'Hogar');
