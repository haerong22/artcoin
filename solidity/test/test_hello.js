const hello = artifacts.require("Hello");

contract("Hello", (accounts) => {

  before(async () => {
    this.instance = await hello.deployed();
  });

  it("sayHello() test", async () => {

    const hello = await this.instance.sayHello();

    assert.equal(hello, "Hello Solidity!!");
  })
});