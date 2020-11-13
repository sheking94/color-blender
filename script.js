const slider = document.getElementById('blender');
const blendedColorValue = document.getElementById('blend-value');
const inputColor1 = document.getElementById('color1');
const inputColor2 = document.getElementById('color2');
const boxColor1 = document.getElementById('box-color1');
const boxColor2 = document.getElementById('box-color2');
const boxBlend = document.getElementById('box-blend');

const res = 255;

const blendColor = (color1, color2, res, blend) => {
  const wrongChar = /[^0-9a-f]/i;

  if (
    color1.length !== 6 ||
    color2.length !== 6 ||
    wrongChar.test(color1) ||
    wrongChar.test(color2)
  )
    return -1;

  const getColorFromRange = (range, res, arg) =>
    ((range[1] - range[0]) / res) * arg + range[0];

  const [RGB1, RGB2] = [color1.match(/.{2}/g), color2.match(/.{2}/g)];

  return [
    ~~getColorFromRange(
      [parseInt(RGB1[0], 16), parseInt(RGB2[0], 16)],
      res,
      blend
    ),
    ~~getColorFromRange(
      [parseInt(RGB1[1], 16), parseInt(RGB2[1], 16)],
      res,
      blend
    ),
    ~~getColorFromRange(
      [parseInt(RGB1[2], 16), parseInt(RGB2[2], 16)],
      res,
      blend
    ),
  ]
    .map((el) => el.toString(16).padStart(2, '0'))
    .join('');
};

slider.setAttribute('max', res);
slider.value = ~~(res / 2);

slider.oninput = function () {
  const color = blendColor(
    inputColor1.value,
    inputColor2.value,
    res,
    this.value
  );

  if (color !== -1) {
    blendedColorValue.innerHTML = `Blended color: <span class="bold-span">#${color}</span>`;
    boxColor1.style.backgroundColor = `#${inputColor1.value}`;
    boxColor2.style.backgroundColor = `#${inputColor2.value}`;
    boxBlend.style.backgroundColor = `#${color}`;
  } else {
    blendedColorValue.innerHTML = 'Wrong input color value!';
  }
};
