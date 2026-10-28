close all;
clear all;
clc;

% Display the cameraman image
i = imshow('cameraman.tif');

% Display pixel coordinates and intensity information
impixelinfo;

% Select two points on the image using the mouse
% x stores horizontal coordinates and y stores vertical coordinates
[x, y] = ginput(2);

% Calculate Euclidean distance (straight-line distance)
Ed = sqrt((x(2)-x(1))^2 + (y(2)-y(1))^2);

disp('Euclidean distance =');
disp(Ed);

% Calculate City Block distance (horizontal + vertical distance)
D4 = abs(x(2)-x(1)) + abs(y(2)-y(1));

disp('City block distance =');
disp(D4);

% Calculate Chessboard distance (maximum coordinate difference)
D8 = max(abs(x(2)-x(1)), abs(y(2)-y(1)));

disp('Chess board distance =');
disp(D8);
