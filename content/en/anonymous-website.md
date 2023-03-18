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
If you want to publish sensitive content on a website and you want to remain anonymous, you can choose a [tor onion service](https://en.wikipedia.org/wiki/Tor_(network)#Onion_services) or the [clearnet](https://en.wikipedia.org/wiki/Clearnet_(networking)).

While there is no doubt that you can keep your identity more private by publishing on tor, you have also to consider that you will likely reach a smaller audience that you can reach with a website publshed on the clearnet.

In this article, we are going to investigate the process I found more efficent to protect your anonymity by publishing a traditional website on the clearnet.

## Use the Tor Browser
*The Tor Browser is a web browser that allows users to browse the internet anonymously by routing their traffic through a series of servers to hide their IP address and encrypt their internet activity. It is designed to protect users' privacy and security by preventing websites from tracking their online behavior and location. The browser is based on the open-source Firefox browser and can be downloaded for free on Windows, Mac, and Linux operating systems.*

If you have an Ubuntu or Debian machine, the recommended method to install it is using Flatpak.

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
For the payment of his services, Njalla accepts bitcoin buth does not support Lightning Network[^ln] payments that are more private then on-chain transactions. However, it also supports some altcoins including Monero[^monero].

To make a untraceable payment to Njalla, we will use [Fixed Float](https://fixedfloat.com) service, to cut the payment connection analysis.

*FixedFloat.com is a cryptocurrency exchange platform that allows users to exchange one type of cryptocurrency for another. It supports more than 150 cryptocurrencies and has a user-friendly interface that makes it easy for users to buy and sell cryptocurrencies quickly and securely.*
*One of the unique features of FixedFloat.com is that it allows users to make exchanges without having to create an account. This means that users can quickly and easily exchange cryptocurrencies without having to go through a lengthy registration process.* 

On Njalla, select the option to add funds to the wallet. When you choose an amount slightly higher that the cost of your services and select Monero as the payment method, the interface will show a Monero address and amount to be paid.

On [Fixed Float](fixedfloat.com), choose the exchange bitcoins over the Lightning Network for Monero, for the amount requested by Njalla and I provided the Njalla address for the withdraw and and finally select the fixed rate as order type.

The amount to be paid to Njalla willchange every couple of minutes, due to the variations in the Monero exchange rate and the process on Fixed Float can take up to one hour. Don't worry, when Njalla receives your deposit, it will be converted to Euro at the last exchange and you will probably be credited for a different amount then the one you selected, but since I suggested to tup up more then what you actually need, you will still be able to pay for the service. If the amount will be higher, you will have some credit for the next VPS renntal renawal.

## Deploy the content
At this point, you are ready to deploy your website.

[^ln]: LN Here's one with multiple paragraphs and code.

  Indent paragraphs to include them in the footnote.

  Add as many paragraphs as you like.

[^monero]: Monero Here's one with multiple paragraphs and code.

  Indent paragraphs to include them in the footnote.

  Add as many paragraphs as you like.

