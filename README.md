# 🚀 Calculadora de Precios de Impresión 3D

Una aplicación web moderna, precisa y lista para producción, diseñada para calcular costos detallados de impresión 3D, creada por **saintsoul**.

## ✨ Stack Tecnológico

Este proyecto utiliza una base sólida de tecnologías de última generación:

### 🎯 Framework Core
- **⚡ Next.js 16** - El framework de React para producción con App Router.
- **📘 TypeScript 5** - JavaScript con tipado fuerte para una mejor experiencia de desarrollo.
- **🎨 Tailwind CSS 4** - Framework de CSS basado en utilidades para un desarrollo de UI rápido.

### 🧩 Componentes de UI y Estilos
- **🧩 shadcn/ui** - Componentes accesibles de alta calidad construidos sobre Radix UI.
- **🎯 Lucide React** - Biblioteca de iconos hermosa y consistente.
- **🌈 Framer Motion** - Biblioteca de animaciones para React lista para producción.
- **🎨 Next Themes** - Soporte nativo para modo oscuro y claro.

### 📋 Formularios y Validación
- **🎣 React Hook Form** - Formularios de alto rendimiento con validación sencilla.
- **✅ Zod** - Validación de esquemas orientada a TypeScript para los parámetros de impresión.

### 🔄 Gestión de Estado y Datos
- **🐻 Zustand** - Gestión de estado simple y escalable para los cálculos.
- **🔄 TanStack Query** - Sincronización de datos potente para React.
- **🌐 Fetch** - Solicitudes HTTP basadas en promesas.

### 🗄️ Base de Datos y Backend
- **🗄️ Prisma** - ORM de próxima generación para la gestión de materiales y perfiles.
- **🔐 NextAuth.js** - Solución completa de autenticación de código abierto.

### 🎨 Funcionalidades Avanzadas
- **📊 TanStack Table** - Tablas de datos con ordenamiento y filtrado para el historial de impresiones.
- **🖱️ DND Kit** - Funcionalidad moderna de arrastrar y soltar.
- **📊 Recharts** - Visualización de costos y consumo mediante gráficos.
- **🖼️ Sharp** - Procesamiento de imágenes de alta velocidad para previsualizaciones.

### 🌍 Utilidades
- **📅 Date-fns** - Manipulación moderna de fechas.
- **🪝 ReactUse** - Colección de hooks esenciales para patrones comunes de React.

## 🎯 Características Principales

- **🏎️ Cálculo Instantáneo** - Obtén el precio final considerando filamento, electricidad y desgaste.
- **🎨 Interfaz Intuitiva** - Panel de control moderno basado en shadcn/ui.
- **🔒 Seguridad Total** - Código escrito íntegramente con TypeScript y validación Zod.
- **📱 100% Responsivo** - Funciona perfectamente en móviles, tablets y escritorio.
- **🗄️ Gestión de Materiales** - Base de datos lista con Prisma para guardar tus perfiles de filamento.
- **🚀 Optimización** - Configuración optimizada para un despliegue rápido y eficiente.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
bun install

# Iniciar servidor de desarrollo
bun run dev

# Compilar para producción
bun run build

# Iniciar servidor de producción
bun start