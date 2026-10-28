
close all;
clear all;
clc;

i1 = imread('bin_image1.tif');
subplot(2,3,1); imshow(i1); title('image 1');

i2 = imread('bin_image2.tif');
subplot(2,3,2); imshow(i2); title('image 2');

i10 = i1 + i2;
subplot(2,3,3); imshow(i10); title('addition');

i11 = i1 - i2;
subplot(2,3,4); imshow(i11); title('subtraction');

i12 = i1 .* i2;
subplot(2,3,5); imshow(i12); title('multiplication');

figure(2);

subplot(3,3,1); imshow(i1); title('image 1');
subplot(3,3,2); imshow(i2); title('image 2');

i3 = and(i1,i2);
subplot(3,3,3); imshow(i3); title('and-image 3');

i4 = or(i1,i2);
subplot(3,3,4); imshow(i4); title('or-image 4');

i5 = not(i1);
subplot(3,3,5); imshow(i5); title('not(image 1)-image 5');

i6 = not(i2);
subplot(3,3,6); imshow(i6); title('not(image 2)-image 6');

i7 = xor(i1,i2);
subplot(3,3,7); imshow(i7); title('xor-image 7');

i8 = not(i3);
subplot(3,3,8); imshow(i8); title('nand-image 8');

i9 = not(i4);
subplot(3,3,9); imshow(i9); title('nor-image 9');
