$(document).ready(function() {
   let position = 0; // изначальная позиция слайдов
   const slidesToShow = 1; // количество отображаемых слайдов
   const slidesToScroll = 1; // ход слайдера (количество прокручивающихся слайдов за нажатие) 
   const container = $('.slider-container'); // контейнер слайдера
   const track = $('.slider-track'); // начинка слайдера (класс, в котором сделаны сдайды)
   const item = $('.slider-item'); // сам слайд
   const btnPrev = $('.btn-prev'); // кнопка "вперёд"
   const btnNext = $('.btn-next'); // кнопка "назад"
   const itemsCount = item.length; // количество слайдов 
   const itemWidth = container.width() / slidesToShow; // ширина слайда = ширина контейнера, делённая на количество отображаемых слайдов. 
   //Если количество отображаемых слайдов равно трём, то контейнер в котором они должны располагаться делится на их количество (т.е. на 3). 
   //В итоге, у нас отображаются 3 слайда с автоматически рассчитанной шириной. 
   const movePosition = slidesToScroll * itemWidth; // Ход одного прокрута. 
   //Таким образом мы умножаем ход слайдера (slidesToScroll) на ширину одного слайда.

   item.each(function (index, item) { // Функция применяется для каждого item => .slider-item => слайда
      $(item).css({ // присваиваем item CSS-значение минимальной ширины - itemWidth (как он далее вычисляется, указано в начале)
         minWidth: itemWidth, 
      });
   });

   btnNext.click(function(){ // для клика по кнопке "вперёд"
      const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow  * itemWidth) / itemWidth; 
      // Создаём переменную itemsLeft. 
      // itemsLeft = кол-во с-ов - (абсолютное число 0 + кол-во отображ-ых с-ов * ширина слайда) / ширина слайда.
      position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth; 
      // если кол-во оставшихся с-ов больше или равно кол-ву с-ов, которые нужно проскроллить, тогда всё хорошо, сдвигаем на обычную дистанцию.
      // в противном случае, берём кол-во с-ов, которые остались, и умножаем на ширину с-да. 
      setPosition(); // вызов ф-ции
      checkBtns(); // вызов ф-ции
   });

   btnPrev.click(function(){ // для клика по кнопке "назад"
      const itemsLeft = Math.abs(position) / itemWidth; // делим абсолютное значение на ширину эл-та. 

      position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth; // то же, что и в первой кнопке.

      setPosition(); // вызов ф-ции
      checkBtns(); // вызов ф-ции
   });


   const setPosition = () => { // применяем track CSS-свойство transform со значнием position
      track.css({
         transform: `translateX(${position}px)`
      });
   };

   const checkBtns = () => { // проверка кнопок на активность (после каждого нажатия)
      // Для кнопок св-во Disabled (неактивно) выполняется при условии: 
      btnPrev.prop('disabled', position === 0); // стартовая позиция. 
      btnNext.prop(
         'disabled', 
         position <= -(itemsCount - slidesToShow) * itemWidth
         // position <= - (кол-во с-ов - кол-во видимых с-ов) * ширину с-да
         // отрицательное, т.к. при скролле вправо, track движется влево 
      );
   };
   
   checkBtns();
});