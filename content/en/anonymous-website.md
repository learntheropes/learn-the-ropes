---
title: Run an anonymous website on the clearnet
description: How to register a domain, buy a vps and deploy the content without sharing any personal information.
tags:
  - privacy
  - tor
  - proton
  - njalla
  - bitcoin
---
## Tor and clearnet
To maintain your anonymity while publishing sensitive content on a website, you can opt for either a [tor onion service](https://en.wikipedia.org/wiki/Tor_(network)#Onion_services) or the [clearnet](https://en.wikipedia.org/wiki/Clearnet_(networking)).

It's true that using tor can enhance your privacy, but it's important to note that you may have a smaller audience compared to publishing on the clearnet.

The focus of this article is to explore a more efficient approach for preserving your anonymity by creating a conventional website on the clearnet.

## Use the Tor Browser
*The Tor Browser is a web browser that allows users to browse the internet anonymously by routing their traffic through a series of servers to hide their IP address and encrypt their internet activity. It is designed to protect users' privacy and security by preventing websites from tracking their online behavior and location. The browser is based on the open-source Firefox browser and can be downloaded for free on Windows, Mac, and Linux operating systems.*

If you have an Ubuntu or Debian machine, the recommended method to install it is using [Flatpak](https://flatpak.org/setup/Ubuntu).

In your terminal run the following commands to install and lunch it.

```
sudo add-apt-repository ppa:flatpak/stable
sudo apt update
sudo apt install flatpak
flatpak install flathub com.github.micahflee.torbrowser-launcher
flatpak run com.github.micahflee.torbrowser-launcher
```

For different operating systems, you can download it from the [official page](https://www.torproject.org/download/).

## Create a secure Proton email under tor 
*Proton is a Swiss-based company that provides secure and private communication solutions for individuals and businesses, under free  and paid plans. The company was founded in 2014 and has since then established itself as a leading provider of encrypted email, VPN, and online storage services. Proton is known for its strong commitment to privacy and security, and its services are designed to protect user data from prying eyes and unauthorized access. Proton solutions are trusted by millions of users worldwide, and the company continues to innovate and expand its offerings to meet the growing demand for secure online communication.*

They have a [clearnet website](https://proton.me/) and a [hidden service](https://protonmailrmez3lotccipshtkleegetolb73fuirgj7r4o4vfu7ozyd.onion)

Connect the Tor Browser and browse to the hideen service [registration page](https://account.protonmailrmez3lotccipshtkleegetolb73fuirgj7r4o4vfu7ozyd.onion/signup?plan=free&product=mail) and register a new email address.

If you are asked for verification, use the captcha method, not an existing email address.

Skip to provide a recovery phone number and a recovery email address.

Enable the two factor authentication under `Go to settings` > `Account and password` on the top right corner gear icon.

Still under `Setting`, visit the `Encryption and keys` tab and under the `Email encryption keys` section, export the PGP public key that you will need later.


## Buy a domain and a VPS on Njalla
*Njalla is a domain registrar based in Sweden that prioritizes the protection of users' privacy. When purchasing a domain through a typical registrar, you're required to provide personal information such as your name, address, phone number, email address, and payment details. Even if you opt for Whois protection to keep this information hidden from the public, the registrar still has access to it. In contrast, Njalla offers a privacy-aware service and doesn't ask for your personal information.*

They offer domain registration, VPS, DNS and VPN.

They have a [clearner website](https://njal.la) and an [hidden service](https://njallalafimoej5i4eg7vlnqjvmb6zhdh27qxcatdn647jtwwwui3nad.onion).

Connect the Tor Browser and browse to the hideen service [registration page](https://njallalafimoej5i4eg7vlnqjvmb6zhdh27qxcatdn647jtwwwui3nad.onion/signup)

Register an account and login using the Proton email registered before and add a domain of you choice and a Virtual Private Server to your cart.

Under the `Account` > `Settings` page, enable the two factor authentication and past the PGP public key that you saved before on Poton, this way all the comunication with Njalla will be encrypted.

## Anonymous payment with Fixed Float
For the payment of his services, Njalla accepts bitcoin buth does not support Lightning Network[^LightningNetwork] payments that are more private then on-chain transactions. However, it also supports some altcoins including Monero[^Monero].

To make a untraceable payment to Njalla, we will use [Fixed Float](https://fixedfloat.com) service, to cut the payment connection analysis.

*FixedFloat.com is a cryptocurrency exchange platform that allows users to exchange one type of cryptocurrency for another. It supports more than 150 cryptocurrencies and has a user-friendly interface that makes it easy for users to buy and sell cryptocurrencies quickly and securely.*
*One of the unique features of FixedFloat.com is that it allows users to make exchanges without having to create an account. This means that users can quickly and easily exchange cryptocurrencies without having to go through a lengthy registration process.* 

On Njalla, select the option to add funds to the wallet. When you choose an amount slightly higher that the cost of your services and select Monero as the payment method, the interface will show a Monero address and amount to be paid.

On [Fixed Float](fixedfloat.com), choose the exchange bitcoins over the Lightning Network for Monero, for the amount requested by Njalla and I provided the Njalla address for the withdraw and and finally select the fixed rate as order type.

The amount to be paid to Njalla willchange every couple of minutes, due to the variations in the Monero exchange rate and the process on Fixed Float can take up to one hour. Don't worry, when Njalla receives your deposit, it will be converted to Euro at the last exchange and you will probably be credited for a different amount then the one you selected, but since I suggested to tup up more then what you actually need, you will still be able to pay for the service. If the amount will be higher, you will have some credit for the next VPS renntal renawal.

## Deploy the content
At this point, you are ready to deploy your website.

[^LightningNetwork]: The Bitcoin Lightning Network is a layer-two solution built on top of the Bitcoin blockchain that aims to solve some of the scalability and privacy issues of on-chain Bitcoin transactions.

    One of the key privacy features of the Lightning Network is that transactions are not broadcasted to the entire Bitcoin network. Instead, they are only visible to the two parties involved in the transaction, providing a higher level of privacy and anonymity.

    In addition, Lightning Network transactions are much faster and cheaper than on-chain Bitcoin transactions. This is because Lightning Network transactions are conducted off-chain, which means that they don't have to be verified by every node in the Bitcoin network. As a result, they can be processed almost instantly and at a fraction of the cost of on-chain transactions.

    Overall, the Lightning Network offers a higher level of privacy and scalability compared to on-chain Bitcoin transactions, making it a popular choice for those who want to make fast and private Bitcoin transactions without incurring high fees or long processing times.

[^Monero]: Monero is a cryptocurrency that places a strong emphasis on privacy and anonymity. It was created in 2014 with the goal of providing a decentralized and private alternative to Bitcoin.

    One of Monero's key features is its use of ring signatures and stealth addresses to obscure the identities of senders and recipients in transactions. This means that it's much harder to trace transactions and link them to specific individuals or addresses.

    Additionally, Monero uses a unique obfuscation technique called "ring confidential transactions" (RingCT) to hide the amounts being sent in transactions. This prevents the amounts from being visible on the public ledger, adding another layer of privacy.

    Overall, Monero's focus on privacy has made it a popular choice for those who value their financial privacy and want to keep their transactions confidential.

