close all;
clear all;
clc;

% Read the original grayscale image
a = imread('cameraman.tif');

% ---------------- LOW PASS FILTER (5x5) ----------------

% Create a 5x5 averaging filter
low = fspecial('average', [5 5]);

% Apply the low pass filter to smooth the image
low1 = imfilter(a, low);

% ---------------- HIGH PASS FILTER ----------------

% Create an unsharp filter to enhance details and edges
high = fspecial('unsharp');

% Apply the unsharp filter to the original image
high1 = imfilter(a, high);

% Display the original image
subplot(2,2,1);
imshow(a);
title('Original Image');

% Display the image smoothed using the 5x5 filter
subplot(2,2,2);
imshow(low1);
title('Low Pass Filtered Image 1 (5x5)');

% Display the image sharpened using the unsharp filter
subplot(2,2,3);
imshow(high1);
title('High Pass Filtered Image');

% ---------------- LOW PASS FILTER (7x7) ----------------

% Create a larger 7x7 averaging filter
low = fspecial('average', [7 7]);

% Apply the 7x7 low pass filter
low2 = imfilter(a, low);

% Display the image smoothed using the 7x7 filter
subplot(2,2,4);
imshow(low2);
title('Low Pass Filtered Image 2 (7x7)');