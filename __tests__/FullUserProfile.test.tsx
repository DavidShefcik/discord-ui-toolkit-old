import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FullUserProfile, FullUserProfileTab, GreenNewDefaultAvatar } from 'discord-ui-toolkit';

import ThemeContext from '@internal/context/ThemeContext';

const tabs: FullUserProfileTab[] = [
  {
    id: 0,
    label: 'First Section',
    content: <span>First Section Content</span>,
  },
  {
    id: 1,
    label: 'Second Section',
    content: <span>Second Section Content</span>,
    sections: [
      {
        label: 'Section Title',
        content: <span>Section Content</span>,
      },
      {
        label: 'Section Title Two',
        content: <span>Section Content Two</span>,
      },
    ],
  },
  {
    id: 2,
    label: 'Third Section',
    content: <span>Third Section Content</span>,
  },
];

describe('<FullUserProfile />', () => {
  it('should render', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/username/i)).toBeInTheDocument();
  });
  it('should display the username', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/username/i)).toBeInTheDocument();
  });
  it('should render children', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username">
          <p>Children</p>
        </FullUserProfile>
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/children/i)).toBeInTheDocument();
  });
  it('should render the tab list', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username" tabs={tabs} defaultTab={0} />
      </ThemeContext.Provider>
    );

    expect(screen.getByText('First Section')).toBeInTheDocument();
    expect(screen.getByText('Second Section')).toBeInTheDocument();
    expect(screen.getByText('Third Section')).toBeInTheDocument();
  });
  it('should change the selected tab when a tab label is clicked', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username" tabs={tabs} defaultTab={0} />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/first section content/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/second section/i));

    expect(screen.queryByText(/first section content/i)).not.toBeInTheDocument();
    expect(screen.getByText(/second section content/i)).toBeInTheDocument();
  });
  it(`should render the selected tab's children`, () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username" tabs={tabs} defaultTab={0} />
      </ThemeContext.Provider>
    );

    expect(screen.getByText('First Section Content')).toBeInTheDocument();
  });
  it('should render the default tab', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username" tabs={tabs} defaultTab={2} />
      </ThemeContext.Provider>
    );

    expect(screen.getByText('Third Section Content')).toBeInTheDocument();
  });
  it(`should render the selected tab's sections`, () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username" tabs={tabs} defaultTab={1} />
      </ThemeContext.Provider>
    );

    expect(screen.getByText('Section Title')).toBeInTheDocument();
    expect(screen.getByText('Section Content')).toBeInTheDocument();
    expect(screen.getByText('Section Title Two')).toBeInTheDocument();
    expect(screen.getByText('Section Content Two')).toBeInTheDocument();
  });
  // New Marketing Layout
  it('should render the username on the new marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/username/i)).toBeInTheDocument();
  });
  it('should render the discriminator on the new marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username" discriminator="1234" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/1234/i)).toBeInTheDocument();
  });
  it('should render the activity title on the new marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username" activityTitle="Activity Title" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/activity title/i)).toBeInTheDocument();
  });
  it('should render the activity subtitle on the new marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username" activityTitle="Activity Subtitle" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/activity subtitle/i)).toBeInTheDocument();
  });
  it('should render the user tag on the new marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username" userTagText="User Tag" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/user tag/i)).toBeInTheDocument();
  });
  // Old Marketing Layout
  it('should render the username on the old marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: false }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/username/i)).toBeInTheDocument();
  });
  it('should render the discriminator on the old marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: false }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username" discriminator="1234" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/1234/i)).toBeInTheDocument();
  });
  it('should render the activity title on the old marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: false }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username" activityTitle="Activity Title" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/activity title/i)).toBeInTheDocument();
  });
  it('should render the activity subtitle on the old marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: false }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username" activityTitle="Activity Subtitle" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/activity subtitle/i)).toBeInTheDocument();
  });
  it('should render the user tag on the old marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: false }}>
        <FullUserProfile avatarSource={GreenNewDefaultAvatar} username="Username" userTagText="User Tag" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/user tag/i)).toBeInTheDocument();
  });
});
