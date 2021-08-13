curr_x_loc = int(input("Where are you? (x-coord): "))
curr_z_loc = int(input("Where are you? (z-coord): "))

BOUNDARY_CORNER_X1 = 3152
BOUNDARY_CORNER_Z1 = -48

def find_nearest_corner(known_boundary_loc, curr_loc):
    num_chunks_apart = (curr_loc - known_boundary_loc) // 16

    return known_boundary_loc + (num_chunks_apart * 16)

def find_opposite_corner(corner):
    return corner + 15

corner_x1 = find_nearest_corner(BOUNDARY_CORNER_X1, curr_x_loc)
corner_z1 = find_nearest_corner(BOUNDARY_CORNER_Z1, curr_z_loc)

corner_x2 = find_opposite_corner(corner_x1)
corner_z2 = find_opposite_corner(corner_z1)

print(f"You are in a chunk with corners at ({corner_x1}, {corner_z1}) and ({corner_x2}, {corner_z2})")

