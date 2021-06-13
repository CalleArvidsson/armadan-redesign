import MockDate from 'mockdate';
import { render } from 'common/testUtils';
import ScheduleGrid from '.';

const mockWeeks = [
  {
    id: '1',
    nr: 20,
    course: {
      name: 'Kallfors',
    },
    tee: {
      name: 'gul',
    },
  },
  {
    id: '2',
    nr: 21,
    course: {
      name: 'Vidbynäs',
    },
    tee: {
      name: 'röd',
    },
  },
];

describe('<ScheduleGrid>', () => {
  afterEach(() => {
    MockDate.reset();
  });

  it('should render weeks', () => {
    MockDate.set('2021-01-04');

    const { getByText } = render(<ScheduleGrid weeks={mockWeeks} />);

    expect(getByText('20')).toBeInTheDocument();
    expect(getByText('18/5 - 23/5')).toBeInTheDocument();
    expect(getByText(/kallfors/i)).toBeInTheDocument();
    expect(getByText(/tee: gul/i)).toBeInTheDocument();

    expect(getByText('21')).toBeInTheDocument();
    expect(getByText('25/5 - 30/5')).toBeInTheDocument();
    expect(getByText(/vidbynäs/i)).toBeInTheDocument();
    expect(getByText(/tee: röd/i)).toBeInTheDocument();
  });
});
