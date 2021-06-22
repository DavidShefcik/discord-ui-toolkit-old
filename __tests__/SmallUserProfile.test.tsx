import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SmallUserProfile, GreenOldDefaultAvatar } from 'discord-ui-toolkit';

import ThemeContext from '@internal/context/ThemeContext';

describe('<SmallUserProfile />', () => {
  it('should render', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <SmallUserProfile avatarSource={GreenOldDefaultAvatar} username="Username" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/username/i)).toBeInTheDocument();
  });
  it('should display the avatar image', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <SmallUserProfile avatarSource={GreenOldDefaultAvatar} username="Username" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/username/i)).toBeInTheDocument();
  });
  it('should fire onAvatarClick', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <SmallUserProfile avatarSource={GreenOldDefaultAvatar} username="Username" />
      </ThemeContext.Provider>
    );

    expect(screen.getByAltText(/avatar/i)).toBeInTheDocument();
  });
  it('should render children', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <SmallUserProfile avatarSource={GreenOldDefaultAvatar} username="Username">
          <p>Children</p>
        </SmallUserProfile>
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/children/i)).toBeInTheDocument();
  });
  it('should render the sections', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <SmallUserProfile
          avatarSource={GreenOldDefaultAvatar}
          username="Username"
          sections={[
            {
              label: 'Section Label',
              content: (
                <>
                  <p>Section Content</p>
                </>
              ),
            },
          ]}
        />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/section label/i)).toBeInTheDocument();
    expect(screen.getByText(/section content/i)).toBeInTheDocument();
  });
  // New Marketing Layout
  it('should render the username on the new marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <SmallUserProfile avatarSource={GreenOldDefaultAvatar} username="Username" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/username/i)).toBeInTheDocument();
  });
  it('should render the discriminator on the new marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <SmallUserProfile avatarSource={GreenOldDefaultAvatar} username="Username" discriminator="1234" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/1234/i)).toBeInTheDocument();
  });
  it('should render the activity title on the new marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <SmallUserProfile avatarSource={GreenOldDefaultAvatar} username="Username" activityTitle="Activity Title" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/activity title/i)).toBeInTheDocument();
  });
  it('should render the activity subtitle on the new marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <SmallUserProfile avatarSource={GreenOldDefaultAvatar} username="Username" activityTitle="Activity Subtitle" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/activity subtitle/i)).toBeInTheDocument();
  });
  it('should render the user tag on the new marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: true }}>
        <SmallUserProfile avatarSource={GreenOldDefaultAvatar} username="Username" userTagText="User Tag" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/user tag/i)).toBeInTheDocument();
  });
  // Old Marketing Layout
  it('should render the username on the old marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: false }}>
        <SmallUserProfile avatarSource={GreenOldDefaultAvatar} username="Username" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/username/i)).toBeInTheDocument();
  });
  it('should render the discriminator on the old marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: false }}>
        <SmallUserProfile avatarSource={GreenOldDefaultAvatar} username="Username" discriminator="1234" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/1234/i)).toBeInTheDocument();
  });
  it('should render the activity title on the old marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: false }}>
        <SmallUserProfile avatarSource={GreenOldDefaultAvatar} username="Username" activityTitle="Activity Title" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/activity title/i)).toBeInTheDocument();
  });
  it('should render the activity subtitle on the old marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: false }}>
        <SmallUserProfile avatarSource={GreenOldDefaultAvatar} username="Username" activityTitle="Activity Subtitle" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/activity subtitle/i)).toBeInTheDocument();
  });
  it('should render the user tag on the old marketing layout', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: jest.fn(), newMarketingLayout: false }}>
        <SmallUserProfile avatarSource={GreenOldDefaultAvatar} username="Username" userTagText="User Tag" />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/user tag/i)).toBeInTheDocument();
  });
});
