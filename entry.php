<?php
  include 'WechatJssdk.class.php';
  $appid = "wx1550c98946e8ef5f";
  $appsecret = "a860cacb2cb29f758698a0eca225fc4b";
  $jssdk = new WechatJssdk($appid,$appsecret);
  $signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
<head> 
  <meta charset="UTF-8">
  <title>酸萝卜餐馆</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="/course-webapp/src/style/index.css"/>
  <script>
      document.ontouchmove = function(e) {
          if (e.target.tagName.toUpperCase() !== 'IFRAME') {
              e.preventDefault();
          }
      };
  </script>
</head>
<body>
  <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
  <script>
    wx.config({
      debug: false,
      appId: "<?php echo $signPackage['appId']; ?>",
      timestamp: '<?php echo $signPackage["timestamp"]; ?>',
      nonceStr: '<?php echo $signPackage["nonceStr"]; ?>',
      signature: '<?php echo $signPackage["signature"]; ?>',
      jsApiList: [
        // 所有要调用的 API 都要加到这个列表中
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'hideOptionMenu',
        'showOptionMenu',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'closeWindow',
        'scanQRCode'
      ]
    });
  </script>
  <script src="/course-webapp/src/scripts/index.js"></script>
</body>
</html>
