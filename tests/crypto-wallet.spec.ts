import { test, expect } from '@playwright/test';

test.describe('Pruebas de Compra en Crypto-Wallet', () => {
  
  test('TC1: Validar compra satisfactoria en Crypto-Wallet', async ({ page }) => {
    // Usar la URL del servidor local
    await page.goto('http://localhost:3000');

    // Paso 1: Simular clic en el botón de compra
    await test.step('Paso 1: Clic en el botón de compra', async () => {
      await page.getByRole('button', { name: ' Comprar' }).click();
    });

    // Paso 2: Llenar la información de pago
    await test.step('Paso 2: Llenar información de pago', async () => {
      await page.getByPlaceholder('0.00').click();
      await page.getByPlaceholder('0.00').fill('100');
      await page.getByPlaceholder('0.00').press('Tab');
      await page.getByPlaceholder('5678 9012 3456').fill('0123456789012345');
      await page.getByPlaceholder('MM/YY').click();
      await page.getByPlaceholder('MM/YY').fill('11/2025');
      await page.getByPlaceholder('123', { exact: true }).click();
      await page.getByPlaceholder('123', { exact: true }).fill('156');
    });

    // Paso 3: Configurar la espera para capturar el mensaje de alerta del navegador
    await test.step('Paso 3: Configurar captura del mensaje de alerta', async () => {
      page.on('dialog', async dialog => {
        // Validar el contenido del mensaje en el diálogo
        expect(dialog.message()).toBe('Esta es una demo. En una implementación real, aquí se procesaría el pago.');
        await dialog.dismiss(); // Cerrar el diálogo
      });
    });

    // Paso 4: Confirmar la compra
    await test.step('Paso 4: Confirmar la compra', async () => {
      await page.getByRole('button', { name: 'Confirmar Compra' }).click();
    });
  });

  test('TC2: Validar mensaje de funcionalidad en desarrollo para la opción P2P en Crypto-Wallet', async ({ page }) => {
    // Usar la URL del servidor local
    await page.goto('http://localhost:3000');

    // Paso 1: Clic en el botón de P2P
    await test.step('Paso 1: Hacer clic en el botón de P2P', async () => {
      await page.click('#btnSell');
    });

    // Paso 2: Configurar la espera para capturar el mensaje de alerta del navegador
    await test.step('Paso 2: Configurar captura del mensaje de alerta', async () => {
      page.on('dialog', async dialog => {
        // Validar el contenido del mensaje en el diálogo
        expect(dialog.message()).toBe('Funcionalidad P2P en desarrollo');
        await dialog.dismiss(); // Cerrar el diálogo
      });
    });
  });

  test('TC3: Validar mensaje de funcionalidad en desarrollo para Enviar en Crypto-Wallet', async ({ page }) => {
    // Usar la URL del servidor local
    await page.goto('http://localhost:3000');

    // Paso 1: Clic en el botón de Enviar
    await test.step('Paso 1: Hacer clic en el botón de Enviar', async () => {
      await page.click('#btnSend');
    });

    // Paso 2: Configurar la espera para capturar el mensaje de alerta del navegador
    await test.step('Paso 2: Configurar captura del mensaje de alerta', async () => {
      page.on('dialog', async dialog => {
        // Validar el contenido del mensaje en el diálogo
        expect(dialog.message()).toBe('Funcionalidad de envío en desarrollo');
        await dialog.dismiss(); // Cerrar el diálogo
      });
    });
  });

});
