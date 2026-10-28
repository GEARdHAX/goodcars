% Image sharpening using HPF (High-Pass Filter)

clc;
clear all;
close all;

% Read the image and convert pixel values to double
% Upload mri_brain.jpg to the current MATLAB folder
a = im2double(imread('mri_brain.jpg'));

% Get the image dimensions
[m, n] = size(a);

% Convert the image to the frequency domain using 2D FFT
b = fft2(a);

% Shift the zero-frequency component to the center
c = fftshift(b);

% ---------------- SEPARABLE HPF MASK ----------------

% Create a mask filled with ones
mask = ones(m, n);

% Define the size of the low-frequency region to remove
p = 100;
q = 100;

% Set the central low-frequency region to zero
for i = round((m-p)/2):round((m+p)/2)
    for j = round((n-q)/2):round((n+q)/2)
        mask(i,j) = 0;
    end
end

% Apply the high-pass filter mask in the frequency domain
d1 = c .* mask;

% Shift the frequency components back
d2 = ifftshift(d1);

% Convert the filtered image back to the spatial domain
e = abs(ifft2(d2));

% Display the original image
subplot(2,2,1);
imshow(a, []);
title('Original Image');

% Display the separable HPF mask
subplot(2,2,2);
imshow(mask, []);
title('Separable High-Pass Filter Mask');

% Display the filtered image
subplot(2,2,3);
imshow(e, []);
title('High-Pass Filtered Image');

% Display the mask in 3D
subplot(2,2,4);
surf(mask);
title('3D View of Mask');
xlabel('HPF - Frequency Domain - Separable Mask');

% ---------------- NON-SEPARABLE HPF MASK ----------------

figure;

% Create normalized frequency coordinates
[u, v] = freqspace(256, 'meshgrid');

% Create a mask filled with ones
H = ones(256, 256);

% Identify the central low-frequency region
d = sqrt(u.^2 + v.^2) < 0.5;

% Set the low-frequency region to zero
H(d) = 0;

% Resize the mask to match the image dimensions if needed
if size(a,1) ~= 256 || size(a,2) ~= 256
    H = imresize(H, [m n], 'nearest');
end

% Apply the non-separable HPF mask
x1 = c .* H;

% Shift the frequency components back
x2 = ifftshift(x1);

% Convert back to the spatial domain
x3 = abs(ifft2(x2));

% Display the original image
subplot(2,2,1);
imshow(a, []);
title('Original Image');

% Display the non-separable HPF mask
subplot(2,2,2);
imshow(H, []);
title('Non-Separable High-Pass Filter Mask');

% Display the filtered image
subplot(2,2,3);
imshow(x3, []);
title('High-Pass Filtered Image');

% Display the mask in 3D
subplot(2,2,4);
surf(H);
title('3D View of H');
xlabel('HPF - Frequency Domain - Non-Separable Mask');