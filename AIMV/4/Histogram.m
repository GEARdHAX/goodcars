clc;
clear all;
close all;

% Read the original grayscale image
I = imread('cameraman.tif');

% Perform histogram equalization to enhance contrast
I2 = histeq(I);

% Display the original image
figure;
subplot(2,2,1);
imshow(I);
title('Original Image');

% Display the histogram of the original image
subplot(2,2,2);
imhist(I);
title('Histogram of Original Image');

% Display the contrast-enhanced image
subplot(2,2,3);
imshow(I2);
title('Equalized Image');

% Display the histogram of the equalized image
subplot(2,2,4);
imhist(I2);
title('Histogram of Contrast Enhanced Image');