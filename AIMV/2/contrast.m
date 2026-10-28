clc; clear all; close all;
figure();
a = imread('cameraman.tif');
b = double(a).*0.5;
b = uint8(b);
subplot(2,2,1); imshow(a); title('og image');
subplot(2,2,2); imshow(b); title('contrast image');