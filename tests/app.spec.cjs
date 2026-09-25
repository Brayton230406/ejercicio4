const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
test("éxito, bloqueo y recuperación de errores", async ({ page }) => {
  const button = page.getByRole("button");
  await page.getByLabel("Tipo de respuesta").selectOption("error");
  await button.click();
  await expect(button).toBeDisabled();
  await expect(page.getByLabel("Tipo de respuesta")).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("Error:");
  await expect(button).toBeEnabled();
  await page.getByLabel("Tipo de respuesta").selectOption("exito");
  await button.click();
  await expect(page.getByRole("status")).toHaveText(
    "Bienvenido, Ana (estudiante).",
  );
});
test("sin desbordamiento desde 320 px hasta escritorio", async ({ page }) => {
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 850 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await expect(page.getByRole("button")).toBeVisible();
  }
});
test("accesibilidad automatizada en todos los estados", async ({ page }) => {
  for (const state of ["idle", "exito", "error"]) {
    if (state !== "idle") {
      await page.getByLabel("Tipo de respuesta").selectOption(state);
      await page.getByRole("button").click();
      await expect(page.getByRole("button")).toBeEnabled();
    }
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
});
test("navegación por teclado", async ({ page }) => {
  await page.keyboard.press("Tab");
  await expect(page.getByLabel("Tipo de respuesta")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button")).toBeFocused();
});
test("sin errores de JavaScript ni solicitudes externas", async ({ page }) => {
  const errors = [];
  const external = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:42871/"))
      external.push(request.url());
  });
  await page.reload();
  await page.getByLabel("Tipo de respuesta").selectOption("exito");
  await page.getByRole("button").click();
  await expect(page.getByRole("status")).toContainText("Bienvenido");
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});
