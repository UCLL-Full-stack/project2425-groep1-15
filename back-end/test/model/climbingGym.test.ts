import { ClimbingGym } from '../../model/climbingGym';

test('given: valid values for climbingGym, when: climbingGym is created, then: climbingGym is created with those values', () => {
    const climbingGym = new ClimbingGym({
        location: 'BoulderOne Herent',
    });

    expect(climbingGym.getLocation()).toEqual('BoulderOne Herent');
});

test('given: invalid values for climbingGym, when: climbingGym is created, then: error is thrown', () => {
    expect(() => {
        new ClimbingGym({
            location: '',
        });
    }).toThrow('Location cannot be empty.');
});
