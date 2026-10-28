clc;
clear all;
close all;

% Read the original image
I = imread('cameraman.tif');

% Convert the image to grayscale if it is RGB
if ndims(I) == 3
    I = rgb2gray(I);
end

% Detect edges using the Sobel method
Iout1 = edge(I, 'sobel');

% Detect edges using the Prewitt method
Iout2 = edge(I, 'prewitt');

% Detect edges using the Roberts method
Iout3 = edge(I, 'roberts');

% Display the original image
figure;
subplot(2,2,1);
imshow(I);
title('Original Image');

% Display Sobel edge detection
subplot(2,2,2);
imshow(Iout1);
title('Edge Map - Sobel');

% Display Prewitt edge detection
subplot(2,2,3);
imshow(Iout2);
title('Edge Map - Prewitt');

% Display Roberts edge detection
subplot(2,2,4);
imshow(Iout3);
title('Edge Map - Roberts');