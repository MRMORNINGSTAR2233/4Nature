def minimize_ugliness(s, cash, a, b):
    ones = s.count('1')
    zeros = s.count('0')
    flip_cost = min(ones * b, zeros * b)
    min_ugliness = int(s, 2)  
    if flip_cost <= cash:
        if ones > zeros:
            flipped_string = s.replace('1', '0')
        else:
            flipped_string = s.replace('0', '1')
        
        min_ugliness = min(min_ugliness, int(flipped_string, 2))
    for i in range(len(s) + 1):
        left_swaps = sum(1 for j in range(i) if s[j] == '0') + sum(1 for j in range(i, len(s)) if s[j] == '1')
        left_swapped = '1' * ones + '0' * zeros
        left_ugliness = int(left_swapped, 2)
        right_swaps = sum(1 for j in range(i) if s[j] == '1') + sum(1 for j in range(i, len(s)) if s[j] == '0')
        right_swapped = '0' * zeros + '1' * ones
        right_ugliness = int(right_swapped, 2)
        
        swap_cost = min(left_swaps, right_swaps) * a
        
        if swap_cost + flip_cost <= cash:
            min_ugliness = min(min_ugliness, left_ugliness, right_ugliness)
    
    return min_ugliness % (10**9 + 7)

s = "000011"
cash = 10
a = 2
b = 3
result = minimize_ugliness(s, cash, a, b)
print(result)
