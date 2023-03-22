---
title: Share private information between own devices
description: How to safely share private notes between own devices.
tags:
  - privacy
  - keet
  - p2p
  - signal
  - keybase
  - bitwarden
  - pgp
---
## The problem of sharing not so secrets text between own devices
I often want to share private info between own devices and keep them saved.  
My devices are an Ubuntu laptop and two phones, one Android and one Iphone.
I have been using [Signal](https://signal.org/en/) and [Keybase](https://keybase.io/) for this.  
I have the feeling that Keybase, after the acquisition by Zoom, will be discontinued soon (they already just discontinued the public pages). Also the file sharing feature has always been buggy for me on iOS.  
On Signal Desktop I'm often logged out and I need to reconnect with the phone, loosing all the share message.  
There might be also the option to use [Bitwarden](https://bitwarden.com/help/attachments/#:~:text=%EE%A7%B0%20Menu%20button.-,Select%20%EE%A4%BF%20Attachments.,Select%20the%20Save%20button.) attachments, but I never investigated it.  
## Use Keet as the sharing solution
I started today to use [Keet](https://keet.io/) for this scope.  
Keet is p2p chat software, developed on Holepunch that allows encrypted video and text without a server. The connection is peer-to-peer.  
A Keet client for all the OS I'm using is already available, altrough in alpha stage.  
To connect the devices to the same chat room, the user(s) need to share a room invite link, that is a long string of text starting with `punch://`.    
While considering if was better to share the string using Signal or email with PGP, I realized that all my devices were physically in the same room, so I could just create the room on the Keet linux client and that share the invite link with a qrcode.
## Use qrencode to generate a qrcode
qrencode is a software to generate qrcode from string on Debian based Linux distributions.  
You can easlily install it from Ubuntu Software GUI or from terminal with:
```bash
sudo apt-get install qrencode
```
To generate the qrcode, type in terminal:
```bash
qrencode -o ~/Documents/keet.png 'punch://jc38t9nr7fasay4nqfxwfaawywfd3y14krnsitj67ymoubiezqdy/yki9ah1cjynuwqpx9p3mi4qjosmaf1gna3u49363omk9b5akmk1t849eg9pp8pbm3j7h6wg5ymjf57piwhi7ccy3hi1q434n4qqw8ukiyry99iazuoeeqyeyybyehpg9uf1okkr8y7nr7ixe6q9iu8pcnbu8jgnz7o79ab3j3bar43q469uxr6kyhgy3kmhufgx7m4hmqj1z6fp3bufi83fnwaqs3zz8ye'
```
Spoiler: this is an invite to a public room that you can join to connect with me.  
Once I generated the qrcode, I scanned the image (in this case is `keet.png` in `Documents` folder) from my phnes and past the generate string in Keet.  
On Iphone I used the built in scanner from the Camera, while keeping the phone in airplan mode.  
On Andoid, the built in scanner doesn't work for me, so I used [Barcode Scanner](https://play.google.com/store/apps/details?id=com.google.zxing.client.android) that is [open source](https://github.com/zxing/zxing) and does not collect any data. To make sure, I used it an arplane mode and deleted the history before reconnecting.  
## Advantages of Keet solution
- No server means that if the service goes offline, you don't loose all your contents.  
- No server also means that if the server get compromised and there is a bug in the encryption system (very unlukely for Signal and Keybase) your contents don't leak.     
## Disadvantages of Keet solution
- The need to share the invite link is a limitation for Keet in general, because you need so share it with someone on the other side of the world, keeping in mind that the link gives full access to all the chat content. The link expires in two days, but still, you need to use another encrypted software to share it.  
- At least in my case, Keet on the Android phone was not able to connect to the room with all the devices connected to different servers of the same VPN provider. I had to disconnect the VPN on Keet Desktop and Keet for Android to be able to connect. Keet suggest to run a [Personal Keet P2P Chat Relay](https://docs.holepunch.to/guides/personal-keet-p2p-chat-relay) but in my case the Keet Desktop was accomplishing exactly the same function on a Linux desktop intead of on a Raspberry Pi. I didn't try to connect all the devices to the same VPN server, that could have been helped probably.  
- As of now, Keet only supports text and video, that means I can't share images and videos or other attachments as I could do on Signal or Keybase or Bitwarden.


 