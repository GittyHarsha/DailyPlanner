width = 1643.560
height = 786.667
def w(x):
    return (x * width) / (842 *16) 

def h(x):
    return (x * height) /( 595 *16)

while True:
    x = input("=> ").split()
    if x[0]=='w':
        print(w(float(x[1])), 'rem', sep='')
    elif x[0]=='h':
        print(h(float(x[1])),'rem', sep='')
    else:
        x[0],x[1]=x[1],x[0]
        if x[0]=='w':
            print(w(float(x[1])), 'rem', sep='')
        elif x[0]=='h':
            print(h(float(x[1])),'rem', sep='')
        else:
            print('invalid input')
