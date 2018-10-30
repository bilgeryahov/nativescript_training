const component = require("../components/home/home.component");

describe("Testing HomeComponent", function () {
  let homeComponent = new component.HomeComponent();

  it("Testing the hash name function - toBe", function () {
    let hashedName = homeComponent.hashName("Bilger Yahov");
    expect(hashedName).toBe("bfba85418f0abf4dd76d7d558ca68c05b8194152");
  });

  it("Testing the hash name function - not toBe", function () {
    let hashedName = homeComponent.hashName("Ilker Yahov");
    expect(hashedName).not.toBe("bfba85418f0abf4dd76d7d558ca68c05b8194152");
  });
});