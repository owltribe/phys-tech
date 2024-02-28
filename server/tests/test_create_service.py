import unittest
from unittest.mock import MagicMock
from server.src.event.service import EventService, Event, EventCreate

from sqlalchemy.orm import Session

class TestEventService(unittest.TestCase):
    def test_create_event(self):
        # Mock session object
        session_mock = MagicMock(spec=Session)
        
        # Create an instance of EventCreate with test data
        event_data = EventCreate(
            name="Сьемки 2",
            description="Качество съёмки улучшает фирменная система визуализации PolarAce, которая задействует искусственный интеллект и мощный чип Sony CXD5622GG",
            start_date="2024-03-28",
            start_time="14:00",
            duration=90,
            location="Алматы"
        )

        # Instantiate EventService with the mocked session
        event_service = EventService(session=session_mock)
        
        # Call the create method with the test data
        created_event = event_service.create(event=event_data)

        # Verify that the session.add method was called with the correct arguments
        session_mock.add.assert_called_once_with(
            Event(
                name=event_data.name,
                description=event_data.description,
                start_date=event_data.start_date,
                start_time=event_data.start_time,
                duration=event_data.duration,
                location=event_data.location,
            )
        )

        # Verify that the session.commit method was called once
        session_mock.commit.assert_called_once()

        # Verify that the session.refresh method was called with the correct argument
        session_mock.refresh.assert_called_once_with(created_event)

        # Assert the return value
        self.assertEqual(created_event.name, event_data.name)
        self.assertEqual(created_event.description, event_data.description)
