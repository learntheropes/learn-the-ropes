---
title: Share private information between own devices
description: How to safely share private notes between own devices.
tags:
  - privacy
  - keet
  - signal
  - keybase
  - PGP
---
## The problem
I often want to share private info between own devices and keep them saved.  
My devices are an Ubuntu laptop and two phones, one Android and one Iphone.
I have been using [Signal](https://signal.org/en/) and [Keybase](https://keybase.io/) for this.  
I have the feeling that Keybase, after the acquisition by Zoom, will be discontinued soon (they already just discontinued the public pages). Also the file sharing feature has always been buggy for me on iOS.  
On Signal Desktop I'm often logged out and I need to reconnect with the phone, loosing all the share message.
## Keet
I started today to use [Keet](https://keet.io/) for this scope.  
Keet is p2p chat software, developed on Holepunch that allows encrypted video and text without a server. The connection is peer-to-peer.  
A Keet client for all the OS I'm using is already available, altrough in alpha stage.  
To connect the devices to the same chat room, the user(s) need to share a room invite link, that is a long string of text starting with `punch://` impossible to copy manually. This is a limitation of the software in general in my opinion, because the access to the string, that expires after two days, also gives access to all the content shared in the chat.  
While considering if was better to share the string using Signal or email to PGP, I realized that all my devices were physically in the same room, so I could just create the room on the Keet linux client and that share the invite link with a qrcode.
## Qrencode
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
## Conclusion
Now I have a new method to share and keep sync private notes between all my devices.
The advantages of not having a server is is that I don't have to strust it for privacy reason and that it can't go offline like Keybase (that uses Amazon AWS).  
 