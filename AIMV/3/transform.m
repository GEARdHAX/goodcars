clc;
clear all;
close all;

% Read the original image
I = imread('cameraman.tif');

% -------------------- IMAGE RESIZING --------------------

% Reduce the image size to 50% using bilinear interpolation
I_reduced = imresize(I, 0.5, 'bilinear');

% Enlarge the image to twice its original size
I_enlarged = imresize(I, 2);

% Display the original image
figure(1);
imshow(I);
title('Original Image');

% Display the reduced image
figure(2);
imshow(I_reduced);
title('Reduced Image');

% Display the enlarged image
figure(3);
imshow(I_enlarged);
title('Enlarged Image');

% -------------------- IMAGE ROTATION --------------------

% Rotate the image by 45 degrees and crop to the original size
I_rot1 = imrotate(I, 45, 'crop');

% Rotate the image by 45 degrees and expand the output dimensions
I_rot2 = imrotate(I, 45, 'loose');

% Display the cropped rotated image
figure(4);
imshow(I_rot1);
title('Rotation by 45 Degrees - Cropped');

% Display the expanded rotated image
figure(5);
imshow(I_rot2);
title('Rotation by 45 Degrees - Loose');

% -------------------- TRANSLATION WITH WRAPPING --------------------

% Set the horizontal and vertical shift values
x0 = 50;
y0 = 50;

% Shift the image by 50 pixels in both dimensions with wrapping
I_t = wshift('2d', I, [x0, y0]);

% Display the translated image
figure(6);
imshow(I_t);
title('Translation with Wrapping');