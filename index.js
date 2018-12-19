let bitcoin = require("bitcoinjs-lib")
let bip39 = require("bip39")
let bip32 = require("bip32")

let myNetwork = bitcoin.networks.testnet

// 1、生成助记词
// let mnemonic = bip39.generateMnemonic()
let mnemonic = "exact eternal hollow cinnamon pumpkin insect near play aunt course drop receive"
console.log(mnemonic)

// 2、通过助记词生成种子
let seed = bip39.mnemonicToSeed(mnemonic);
console.log("seed", seed.toString('hex'))
// let seedHex = bip39.mnemonicToSeedHex(mnemonic)
// console.log(seedHex)

// 3、通过种子生成根秘钥
let root = bip32.fromSeed(seed, myNetwork)
// console.log("root: ", root.toBase58)

for(let i = 0; i < 5; i++) {
    // 4、通过根秘钥生成子秘钥
    const path = "m/44'/1'/0'/0/" + i
    console.log("\n路径：", path)
    let keypair = root.derivePath(path)

    // 5、获取指定路径的子秘钥
    let privatekey = keypair.toWIF()
    console.log("私钥：", privatekey)

    // 6、获取公钥
    let publickey = keypair.publicKey.toString('hex')
    console.log("公钥：", publickey)

    // 7、获取地址
    let address = bitcoin.payments.p2pkh({pubkey: keypair.publicKey, network: myNetwork}).address
    console.log("地址：", address)
}
