import { ClimbingGym } from '../../model/climbingGym';

test('given: valid values for climbingGym, when: climbingGym is created, then: climbingGym is created with those values', () => {
    const climbingGym = new ClimbingGym({
        location: 'Herent',
        gymName: 'Boulder One',
    });

    expect(climbingGym.getLocation()).toEqual('Herent');
});

test('given: invalid values for climbingGym, when: climbingGym is created, then: error is thrown', () => {
    expect(() => {
        new ClimbingGym({
            location: '',
            gymName: 'Boulder One',
        });
    }).toThrow('Location cannot be empty.');
});

test('given: invalid values for climbingGym, when: climbingGym is created, then: error is thrown', () => {
    expect(() => {
        new ClimbingGym({
            location: 'Herent',
            gymName: '',
        });
    }).toThrow('GymName cannot be empty.');
});
