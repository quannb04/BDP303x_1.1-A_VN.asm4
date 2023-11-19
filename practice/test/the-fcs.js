const TheFunixCryptoSim = artifacts.require("TheFunixCryptoSim");

contract("TheFunixCryptoSim", function (/* accounts */) {
  let instance;

  before(async function () {
    instance = await TheFunixCryptoSim.deployed();
  });

  describe("Contract", function () {
    it("should deployed", function () {
      return assert.isTrue(instance !== undefined);
    });
  });

  // *** Start Code here ***
  //Task 1: Information of token
  describe("Information of token", function () {
    //Symbol of token
    it("Symbol of the token", function () {
      return instance.symbolOfToken().then(function (result) {
        assert.equal(result, "FCS", "Symbol of token must be FCS");
      });
    });

    //Name of token
    it("Name of the token", function () {
      return instance.nameOfToken().then(function (result) {
        assert.equal(
          result,
          "TheFunixCryptoSims",
          "Name of token must be TheFunixCryptoSims"
        );
      });
    });
  });

  //Task 2: Information of genesis FCS
  describe("Information of genesis FCS", function () {
    //The first genesis
    it("The first genesis", function () {
      return instance
        .sims(0)
        .then(function (result) {
          assert.equal(result[1], 0, "matronId must be equal 0");
          assert.equal(result[2], 0, "sireId must be equal 0");
          return result[0];
        })
        .then(function (result) {
          assert.equal(result[0], 0, "Body must be equal 0");
          assert.equal(result[1], 0, "Eye must be equal 0");
          assert.equal(result[2], 0, "Hairstyle must be equal 0");
          assert.equal(result[3], 0, "Outfit must be equal 0");
          assert.equal(result[4], 0, "Accessory must be equal 0");
          assert.equal(result[5], 0, "HiddenGenes must be equal 0");
          assert.equal(result[6], 0, "Generation Genes must be equal 0");
        });
    });

    //The second genesis
    it("The first genesis", function () {
      return instance
        .sims(1)
        .then(function (result) {
          assert.equal(result[1], 0, "matronId must be equal 0");
          assert.equal(result[2], 0, "sireId must be equal 0");
          return result[0];
        })
        .then(function (result) {
          assert.equal(result[0], 3, "Body must be equal 3");
          assert.equal(result[1], 7, "Eye must be equal 7");
          assert.equal(result[2], 127, "Hairstyle must be equal 127");
          assert.equal(result[3], 31, "Outfit must be equal 31");
          assert.equal(result[4], 31, "Accessory must be equal 31");
          assert.equal(result[5], 0, "HiddenGenes must be equal 0");
          assert.equal(result[6], 0, "Generation Genes must be equal 0");
        });
    });
  });

  //Task 3: Test breedSim
  describe("Test breedSim", function () {
    //Test HiddenGenes equal - 0 vs 0
    it("Test HiddenGenes equal", function () {
      return instance
        .breedSim(0, 1)
        .then(function (result) {
          return instance.sims(2);
        })
        .then(function (result) {
          assert.equal(result[1], 0, "matronId must be equal 0");
          assert.equal(result[2], 1, "sireId must be equal 1");
          return result[0];
        })
        .then(function (result) {
          assert.equal(result[0], 2, "Body must be equal 2");
          assert.equal(result[1], 7, "Eye must be equal 7");
          assert.equal(result[2], 127, "Hairstyle must be equal 127");
          assert.equal(result[3], 31, "Outfit must be equal 31");
          assert.equal(result[4], 30, "Accessory must be equal 30");
          assert.equal(result[5], 3, "HiddenGenes must be equal 3");
          assert.equal(result[6], 1, "Generation Genes must be equal 1");
        });
    });

    //Test matron's HiddenGenes smaller than sire's HiddenGenes - 0 vs 3
    it("Test matron's HiddenGenes smaller than sire's HiddenGenes", function () {
      return instance
        .breedSim(0, 2)
        .then(function (result) {
          return instance.sims(3);
        })
        .then(function (result) {
          assert.equal(result[1], 0, "matronId must be equal 0");
          assert.equal(result[2], 2, "sireId must be equal 2");
          return result[0];
        })
        .then(function (result) {
          assert.equal(result[0], 1, "Body must be equal 1");
          assert.equal(result[1], 7, "Eye must be equal 7");
          assert.equal(result[2], 127, "Hairstyle must be equal 127");
          assert.equal(result[3], 31, "Outfit must be equal 31");
          assert.equal(result[4], 29, "Accessory must be equal 29");
          assert.equal(result[5], 3, "HiddenGenes must be equal 3");
          assert.equal(result[6], 2, "Generation Genes must be equal 2");
        });
    });

    //Test matron's HiddenGenes bigger than sire's HiddenGenes - 3 vs 0
    it("Test matron's HiddenGenes bigger than sire's HiddenGenes", function () {
      return instance
        .breedSim(2, 0)
        .then(function (result) {
          return instance.sims(4);
        })
        .then(function (result) {
          assert.equal(result[1], 2, "matronId must be equal 2");
          assert.equal(result[2], 0, "sireId must be equal 0");
          return result[0];
        })
        .then(function (result) {
          assert.equal(result[0], 1, "Body must be equal 1");
          assert.equal(result[1], 7, "Eye must be equal 7");
          assert.equal(result[2], 0, "Hairstyle must be equal 0");
          assert.equal(result[3], 31, "Outfit must be equal 31");
          assert.equal(result[4], 29, "Accessory must be equal 29");
          assert.equal(result[5], 3, "HiddenGenes must be equal 3");
          assert.equal(result[6], 2, "Generation Genes must be equal 2");
        });
    });

    //Test Advanced section
    it("Advanced section", function () {
      // let body;
      // let eye;
      // let hairyStyle;
      // let outfit;
      // let accessory;
      // let hiddenGenes;
      // let generations;

      return instance
        .breedSim(2, 3)
        .then(function (result) {
          return instance.sims(5);
        })
        .then(function (result) {
          return result[0];
        })
        .then(function (result) {
          // attributes.body: 4 variants
          assert.isAtLeast(Number(result[0]), 0, "Minimum of Body equal 0");
          assert.isAtMost(Number(result[0]), 3, "Maximum of Body equal 3");

          // attributes.eye : 8 variants
          assert.isAtLeast(Number(result[1]), 0, "Minimum of Eye equal 0");
          assert.isAtMost(Number(result[1]), 7, "Maximum of Eye equal 7");

          // attributes.hairyStyle : 128 variants
          assert.isAtLeast(
            Number(result[2]),
            0,
            "Minimum of HairyStyle equal 0"
          );
          assert.isAtMost(
            Number(result[2]),
            127,
            "Maximum of HairyStyle equal 127"
          );

          // attributes.outfit : 32 variants
          assert.isAtLeast(Number(result[3]), 0, "Minimum of Outfit equal 0");
          assert.isAtMost(Number(result[3]), 32, "Maximum of Outfit equal 32");

          // attributes.accessory : 32 variants
          assert.isAtLeast(
            Number(result[4]),
            0,
            "Minimum of Accessory equal 0"
          );
          assert.isAtMost(
            Number(result[4]),
            32,
            "Maximum of Accessory equal 32"
          );

          // attributes.ahddenGenes : 4 variants
          assert.isAtLeast(
            Number(result[5]),
            0,
            "Minimum of HiddenGenes equal 0"
          );
          assert.isAtMost(
            Number(result[5]),
            3,
            "Maximum of HiddenGenes equal 3"
          );

          // attributes.generations : 256 variants
          assert.isAtLeast(
            Number(result[6]),
            0,
            "Minimum of Generations equal 0"
          );
          assert.isAtMost(
            Number(result[6]),
            255,
            "Maximum of Generations equal 255"
          );
        });
    });
  });
  // *** End Code here ***
});
