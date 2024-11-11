# Crypto Wallet - Proyecto de Automatización de Pruebas

Este repositorio contiene las pruebas automatizadas para la aplicación **Crypto Wallet**. Estas pruebas verifican diversas funcionalidades de la billetera digital, asegurando que los flujos de compra, envío y opciones P2P funcionen correctamente en el entorno de pruebas. El proyecto está construido con **Playwright** y **TypeScript** para garantizar una alta cobertura y confiabilidad en el proceso de automatización.
Crypto Wallet es una simulación diseñada para mostrar las capacidades de Playwright y TypeScript en la automatización de pruebas de aplicaciones web. La billetera fue desarrollada en HTML y JavaScript exclusivamente para fines de demostración y aprendizaje.

## Tabla de Contenidos
- [Descripción del Proyecto](#descripción-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecución de Pruebas](#ejecución-de-pruebas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Comandos Útiles](#comandos-útiles)

## Descripción del Proyecto
El objetivo principal de este proyecto es automatizar los casos de prueba de la aplicación **Crypto Wallet**, una billetera digital de criptomonedas. Las pruebas cubren escenarios críticos en la funcionalidad de compra de criptomonedas, la opción P2P y el envío de fondos, validando alertas de funcionalidad en desarrollo y mensajes en tiempo de ejecución.

## Tecnologías Utilizadas
- **Playwright**: Framework de pruebas de automatización para aplicaciones web.
- **TypeScript**: Lenguaje utilizado para proporcionar tipado estático y mejorar la calidad del código.

## Requisitos Previos
Asegúrate de tener instalado lo siguiente en tu sistema:
- **Node.js** (versión 14 o superior)
- **npm** (viene con Node.js)

Para verificar la instalación de Node.js y npm:
```bash
node -v
npm -v
```

## Instalación y Configuración
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/crypto-wallet-automation.git
   cd crypto-wallet-automation
   ```

2. Inicializa el proyecto de Playwright con TypeScript:
   ```bash
   npm init playwright@latest
   ```
   Este comando generará la estructura de carpetas y archivos necesarios, como `tests`, `playwright.config.ts`, y configurará Playwright para trabajar con TypeScript.

3. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

## Ejecución de Pruebas
Para ejecutar las pruebas en el navegador predeterminado (por lo general, Chromium), utiliza el siguiente comando:
```bash
npx playwright test
```

Para ejecutar las pruebas en todos los navegadores:
```bash
npx playwright test --project=all
```

Para ejecutar un caso de prueba específico:
```bash
npx playwright test tests/nombre-del-archivo.spec.ts
```

## Estructura del Proyecto
La estructura del proyecto es la siguiente:

```
crypto-wallet-automation/
│
├── tests/                   # Carpeta principal de pruebas
│   ├── prueba.spec.ts       # Archivo de pruebas de compra y validaciones de dialogos
│
├── playwright.config.ts     # Configuración de Playwright
│
├── package.json             # Dependencias y scripts del proyecto
│
└── README.md                # Descripción del proyecto y guía de uso
```

## Comandos Útiles
- **Ejecutar pruebas en modo UI** (para inspeccionar cada paso en la interfaz):
  
  npx playwright test --ui
  
  
- **Ver reporte de resultados** (después de ejecutar las pruebas):
  
  npx playwright show-report
  

- **Actualizar Playwright** (para obtener las últimas versiones de navegadores y herramientas):
  
  npx playwright install
  

## Notas
- Los casos de prueba están configurados para trabajar en un entorno local (`http://localhost:3000`). Asegúrate de que el servidor esté activo antes de ejecutar las pruebas.
- Los mensajes de validación en las alertas están configurados para verificar el contenido textual específico, simulando la respuesta que el usuario final recibiría en producción.

Este proyecto es una solución de automatización completa para el entorno **Crypto Wallet**, y puede expandirse para incluir nuevos casos de prueba y funcionalidades.



Este README proporciona una guía detallada para cualquier usuario o colaborador que desee ejecutar o contribuir al proyecto de automatización de **Crypto Wallet**.