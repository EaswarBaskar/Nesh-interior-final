// Direction-aware slide animation
$(function () {
  const $items = $('.carousel-item');
  let total = $items.length;
  let current = Math.max(0, $items.index($('.carousel-item.active')));
  if (current < 0) current = 0;
  $items.removeClass('active').eq(current).addClass('active');

  let locked = false;
  const DURATION = 550; // keep in sync with CSS (.55s)

  function go(dir){
    if (locked || !total) return;
    const nextIndex = (dir === 'next')
      ? (current + 1) % total
      : (current - 1 + total) % total;

    if (nextIndex === current) return;

    locked = true;

    const $from = $items.eq(current);
    const $to   = $items.eq(nextIndex);

    // clear any old animation classes
    $items.removeClass('entering-next entering-prev leaving-next leaving-prev');

    // mark directions
    if (dir === 'next'){
      $from.addClass('leaving-next').removeClass('active');
      $to.addClass('entering-next');
    } else {
      $from.addClass('leaving-prev').removeClass('active');
      $to.addClass('entering-prev');
    }

    // ensure the entering slide is visible under the animation
    $to.css({opacity:1, visibility:'visible', pointerEvents:'auto'});

    const finish = () => {
      $items.removeClass('entering-next entering-prev leaving-next leaving-prev');
      $to.addClass('active').removeAttr('style');
      current = nextIndex;
      locked = false;
    };

    // finalize on animation end (with a fallback timer)
    $to.one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', finish);
    setTimeout(finish, DURATION + 100);
  }

  $('#moveRight').on('click', () => go('next'));
  $('#moveLeft').on('click',  () => go('prev'));

  // keyboard + swipe (optional)
  $('.carousel').attr('tabindex','0').on('keydown', e => {
    if (e.key === 'ArrowRight') go('next');
    if (e.key === 'ArrowLeft')  go('prev');
  });
  let sx=0;
  $('.carousel').on('touchstart', e => sx = e.originalEvent.changedTouches[0].clientX);
  $('.carousel').on('touchend',   e => {
    const dx = e.originalEvent.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) (dx < 0 ? go('next') : go('prev'));
  });
});
