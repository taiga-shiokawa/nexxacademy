$(function () {

  //スクロールエフェクト
  function fadeUpEffect() {
		$('.fadeUpEffect').each(function () {
			var elemPos = $(this).offset().top + 100;
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			if (scroll >= elemPos - windowHeight) {
				$(this).addClass('fadeUp');
			}
		});
  }
  $(window).scroll(function () {
		fadeUpEffect();
  });

  //トレーナーのタブ
  $tabs = $('.tab');
  $('.tab').on('click', function () {
    $('.tab--active').removeClass('tab--active');
    $(this).addClass('tab--active');
    const index = $tabs.index(this);
    $('.tab-content').removeClass('show').eq(index).addClass('show');
  })

  //FAQのアコーディオン
  $('.accordion__question').on('click', function(){
    $(this).toggleClass('active');
    $(this).next().slideToggle(200);
  });

  //ページトップへ戻る
  var $pageTop = $('.page-top');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $pageTop.fadeIn();
    } else {
      $pageTop.fadeOut();
    }
  });
  $pageTop.on('click', function () {
    $('body,html').animate({
      scrollTop: 0
    }, 200);
    return false;
  });

  //スクロールに応じてヘッダーにactiveクラスを付与
	$(window).scroll(function () {
		if ($(this).scrollTop() > 200) {
			$('.header').addClass('header--active');
		} else {
			$('.header').removeClass('header--active');
		}
  });

  //Swiperの初期化
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  });

  // スクロールイベント
  $(".price-list").scroll(function(){
    // scrollLeftメソッドの結果を表示
    if ($(this).scrollLeft() > 20) {
      $(".price-list__scroll").fadeOut();
    }
  });


  /*
  背景色が伸びてテキストを表示
  */
  // 動きのきっかけの起点となるアニメーションの名前を定義
  function BgFadeAnime(){

    // 背景色が伸びて出現（左から右）
    $('.bgLRextendTrigger').each(function(){ //bgLRextendTriggerというクラス名が
      var elemPos = $(this).offset().top-50;//要素より、50px上の
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight){
        $(this).addClass('bgLRextend');// 画面内に入ったらbgLRextendというクラス名を追記
      }else{
        $(this).removeClass('bgLRextend');// 画面外に出たらbgLRextendというクラス名を外す
      }
    });

    // 文字列を囲う子要素
    $('.bgappearTrigger').each(function(){ //bgappearTriggerというクラス名が
      var elemPos = $(this).offset().top-50;//要素より、50px上の
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight){
        $(this).addClass('bgappear');// 画面内に入ったらbgappearというクラス名を追記
      }else{
        $(this).removeClass('bgappear');// 画面外に出たらbgappearというクラス名を外す
      }
    });
  }

  // 画面をスクロールをしたら動かしたい場合の記述
  $(window).scroll(function (){
    BgFadeAnime();/* アニメーション用の関数を呼ぶ*/
  });// ここまで画面をスクロールをしたら動かしたい場合の記述

  // 画面が読み込まれたらすぐに動かしたい場合の記述
  $(window).on('load', function(){
    BgFadeAnime();/* アニメーション用の関数を呼ぶ*/
  });// ここまで画面が読み込まれたらすぐに動かしたい場合の記述

});