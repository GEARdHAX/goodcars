clc; clear all; close all;
r = double(imread('cameraman.tif'));
g = input("Enter Gamma Value : ");
s = r.^g;
subplot(2,2,1); imshow(uint8(r)); title('og image');
subplot(2,2,2); imshow(uint8(s)); title('Gamma Image');