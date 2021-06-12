import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Message, BlueNewDefaultAvatar } from 'discord-ui-toolkit';

describe('<Message />', () => {
  const mockUsernameClick = jest.fn();
  const mockAvatarClick = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    render(
      <Message
        content={[
          {
            id: 0,
            text: 'Message Text',
          },
        ]}
        avatarSource={BlueNewDefaultAvatar}
        username="Username"
        timeText="Time Text"
      />
    );

    expect(screen.getByText(/message text/i)).toBeInTheDocument();
  });
  it('should render the username', () => {
    render(
      <Message
        content={[
          {
            id: 0,
            text: 'Message Text',
          },
        ]}
        avatarSource={BlueNewDefaultAvatar}
        username="Username"
        timeText="Time Text"
      />
    );

    expect(screen.getByText(/username/i)).toBeInTheDocument();
  });
  it('should render the time text', () => {
    render(
      <Message
        content={[
          {
            id: 0,
            text: 'Message Text',
          },
        ]}
        avatarSource={BlueNewDefaultAvatar}
        username="Username"
        timeText="Time Text"
      />
    );

    expect(screen.getByText(/time text/i)).toBeInTheDocument();
  });
  it('should render the avatar', () => {
    render(
      <Message
        content={[
          {
            id: 0,
            text: 'Message Text',
          },
        ]}
        avatarSource={BlueNewDefaultAvatar}
        username="Username"
        timeText="Time Text"
      />
    );

    expect(screen.getByAltText(/avatar/i)).toBeInTheDocument();
  });
  it('should render the edited text', () => {
    render(
      <Message
        content={[
          {
            id: 0,
            text: 'Message Text',
            editedText: 'Edited Text',
          },
        ]}
        avatarSource={BlueNewDefaultAvatar}
        username="Username"
        timeText="Time Text"
      />
    );

    expect(screen.getByText(/edited text/i)).toBeInTheDocument();
  });
  it('should render the second and third message content items', () => {
    render(
      <Message
        content={[
          {
            id: 0,
            text: 'First Message Text',
            editedText: 'Edited Text',
          },
          {
            id: 1,
            text: 'Second Message Text',
          },
          {
            id: 2,
            text: 'Third Message Text',
          },
        ]}
        avatarSource={BlueNewDefaultAvatar}
        username="Username"
        timeText="Time Text"
      />
    );

    expect(screen.getByText(/first message text/i)).toBeInTheDocument();
    expect(screen.getByText(/second message text/i)).toBeInTheDocument();
    expect(screen.getByText(/third message text/i)).toBeInTheDocument();
  });
  it('should fire username on click if usernameOnClick is passed', () => {
    render(
      <Message
        content={[
          {
            id: 0,
            text: 'First Message Text',
            editedText: 'Edited Text',
          },
          {
            id: 1,
            text: 'Second Message Text',
          },
          {
            id: 2,
            text: 'Third Message Text',
          },
        ]}
        avatarSource={BlueNewDefaultAvatar}
        username="Username"
        usernameOnClick={mockUsernameClick}
        timeText="Time Text"
      />
    );

    expect(mockUsernameClick).toBeCalledTimes(0);
    userEvent.click(screen.getByText(/username/i));

    expect(mockUsernameClick).toBeCalledTimes(1);
  });
  it('should fire avatar on click if avatarOnClick is passed', () => {
    render(
      <Message
        content={[
          {
            id: 0,
            text: 'First Message Text',
            editedText: 'Edited Text',
          },
          {
            id: 1,
            text: 'Second Message Text',
          },
          {
            id: 2,
            text: 'Third Message Text',
          },
        ]}
        avatarSource={BlueNewDefaultAvatar}
        avatarOnClick={mockAvatarClick}
        username="Username"
        timeText="Time Text"
      />
    );

    expect(mockAvatarClick).toBeCalledTimes(0);
    userEvent.click(screen.getByAltText(/avatar/i));

    expect(mockAvatarClick).toBeCalledTimes(1);
  });
});
