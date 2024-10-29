import { ClimbingGym } from '../../model/climbingGym';

test('given: valid values for climbingGym, when: climbingGym is created, then: climbingGym is created with those values', () => {
    const climbingGym = new ClimbingGym({
        location: 'BoulderOne Herent',
    });

    expect(climbingGym.getLocation()).toEqual('BoulderOne Herent');
});
