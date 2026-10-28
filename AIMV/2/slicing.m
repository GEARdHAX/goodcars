clc; clear all; close all;
f = double(imread('cameraman.tif'));
[m,n] = size(f);
L = double(255);
a = double(round(L/1.2));
b = double(round(L));
for i=1:m
    for j=1:n
        if(f(i,j) >= a & f(i,j) <= b)
            g(i,j) = L;
        else
            g(i,j) = f(i,j);
        end
    end
end
subplot(2,2,1),imshow(uint8(f)),title('original image&');
subplot(2,2,2),imshow(uint8(g)),title('gray level sliced image');
xlabel(sprintf('the values of a and b are %g %g',a,b));