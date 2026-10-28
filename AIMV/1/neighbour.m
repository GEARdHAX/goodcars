close all;
clear all;
clc;

a = magic(5), a;

b = input('enter the row number');
c = input('enter the column number');

N4 = [a(b,c-1), a(b-1,c), a(b,c+1), a(b+1,c)], N4;

Nd = [a(b-1,c-1), a(b-1,c+1), a(b+1,c+1), a(b+1,c-1)], Nd;

N8 = [N4, Nd], N8;