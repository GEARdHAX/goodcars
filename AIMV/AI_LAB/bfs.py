import networkx as nx
import matplotlib.pyplot as plt
from collections import deque

G = nx.Graph()
n = int(input("Enter no. of edges : "))
for _ in range(n):
    u, v = input().split()
    G.add_edge(u, v)
start = input("Enter start node: ")
dest = input("Enter goal node: ")
pos = nx.spring_layout(G)


def draw_graph(visited, current):
    plt.clf()
    node_colors = []
    for node in G.nodes():
        if node == current:
            node_colors.append("red")
        elif node in visited:
            node_colors.append("green")
        else:
            node_colors.append("lightblue")
    nx.draw(G, pos, with_labels=True, node_color=node_colors, node_size=3000)
    plt.title(f"BFS visiting: {current}")
    plt.pause(1)

def bfs():
    OPEN = deque([start])
    VISITED = set([start])
    CLOSE = []
    plt.figure()
    while OPEN:
        N = OPEN.popleft()
        CLOSE.append(N)
        draw_graph(CLOSE, N)

        if N == dest:
            print("\nDestination Reached\n")
            print("Traversal : ",CLOSE)
            break
        for neighbour in G[N]:
            if neighbour not in VISITED:
                OPEN.append(neighbour)
                VISITED.add(neighbour)
    plt.show()

bfs()