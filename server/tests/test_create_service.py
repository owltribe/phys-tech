import unittest
from unittest.mock import MagicMock
from server.src.event.service import EventService, Event, EventCreate

from sqlalchemy.orm import Session

class TestEventService(unittest.TestCase):
    def setUp(self):
        # Create a mock session object for each test
        self.session_mock = MagicMock(spec=Session)
        # Instantiate EventService with the mocked session
        self.event_service = EventService(session=self.session_mock)
        
    def test_create_event(self):
        # Test data
        event_data = EventCreate(
            name="test name",
            description="test desc",
            start_date="2024-03-28",
            start_time="14:00",
            duration=90,
            location="Almaty"
        )
        
        # Call the create method with the test data
        created_event = self.event_service.create(event=event_data)

        # Verify interactions with the session
        self.session_mock.add.assert_called_once()
        self.session_mock.commit.assert_called_once()
        self.session_mock.refresh.assert_called_once_with(created_event)

        # Verify the return value attributes
        self.assertEqual(created_event.name, event_data.name)
        self.assertEqual(created_event.description, event_data.description)
    
    def test_create_event_invalid_data(self):
        # Test with invalid data
        invalid_event_data = EventCreate(
            name="",
            description="test desc",
            start_date="2024-03-28",
            start_time="14:00",
            duration=90,
            location="Almaty"
        )
        
        # # Call the create method with invalid data
        # with self.assertRaises(ValueError):
        #     self.event_service.create(event=invalid_event_data)

    def test_create_event_edge_cases(self):
        # Test with the minimum possible start date
        event_data = EventCreate(
            name="test name",
            description="test desc",
            start_date="0001-01-01",  # Minimum possible start date
            start_time="14:00",
            duration=90,
            location="Almaty"
        )
        
        # Call the create method with the test data
        created_event = self.event_service.create(event=event_data)

        # Verify interactions with the session
        self.session_mock.add.assert_called_once()
        self.session_mock.commit.assert_called_once()
        self.session_mock.refresh.assert_called_once_with(created_event)

        # Verify the return value attributes
        self.assertEqual(created_event.name, event_data.name)
        self.assertEqual(created_event.description, event_data.description)
        self.assertEqual(created_event.start_date, event_data.start_date)
        self.assertEqual(created_event.start_time, event_data.start_time)
        self.assertEqual(created_event.duration, event_data.duration)
        self.assertEqual(created_event.location, event_data.location)

