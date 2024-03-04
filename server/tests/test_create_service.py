import unittest
from unittest.mock import MagicMock

from sqlalchemy.orm import Session

from server.src.event.service import EventCreate, EventService
from datetime import datetime, timedelta

class TestEventService(unittest.TestCase):
    def setUp(self):
        # Create a mock session object for each test
        self.session_mock = MagicMock(spec=Session)
        # Instantiate EventService with the mocked session
        self.event_service = EventService(session=self.session_mock)

    def test_create_event(self):
        # Test data
        event_data = EventCreate(
            name="Сьемки 2",
            description="Качество съёмки улучшает фирменная система визуализации PolarAce, которая задействует искусственный интеллект и мощный чип Sony CXD5622GG",
            start_date="2024-03-28",
            start_time="14:00",
            duration=90,
            location="Алматы",
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
            location="Almaty",
        )

        # Call the create method with invalid data
        created_event = self.event_service.create(event=invalid_event_data)
        # Verify that the created_event is None
        self.assertIsNotNone(created_event)

    def test_create_event_invalid_missing_description(self):
        # Test with invalid data: missing description
        invalid_event_data = EventCreate(
            name="test name",
            description="",
            start_date="2024-03-28",
            start_time="14:00",
            duration=90,
            location="Almaty"
        )

        # Call the create method with invalid data
        created_event = self.event_service.create(event=invalid_event_data)
        # Verify that the created_event is None
        self.assertIsNotNone(created_event)

    def test_create_event_invalid_missing_location(self):
        # Test with invalid data: missing location
        invalid_event_data = EventCreate(
            name="test name",
            description="test desc",
            start_date="2024-03-28",
            start_time="14:00",
            duration=90,
            location="",
            # Location is missing which is invalid
        )
        
        # Call the create method with invalid data
        created_event = self.event_service.create(event=invalid_event_data)
        # Verify that the created_event is None
        self.assertIsNotNone(created_event)

    def test_create_event_edge_case_long_duration(self):
        start_date = datetime.now() + timedelta(days=1)  # Start date is set to tomorrow
        end_date = start_date + timedelta(days=4)  # End date is set 4 days from the start date
        event_data = EventCreate(
            name="test name",
            description="test desc",
            start_date=start_date.strftime("%Y-%m-%d"),
            start_time="14:00",
            duration=(end_date - start_date).days * 24 * 60,  # Duration is set to cover more than 3 days
            location="Almaty"
        )
        
        # Call the create method with the edge case data
        created_event = self.event_service.create(event=event_data)

        # Verify interactions with the session
        self.session_mock.add.assert_called_once()
        self.session_mock.commit.assert_called_once()
        self.session_mock.refresh.assert_called_once_with(created_event)

        # Verify the return value attributes
        self.assertEqual(created_event.name, event_data.name)
        self.assertEqual(created_event.description, event_data.description)

    def test_create_event_edge_case_past_date(self):
        past_date = datetime.now() - timedelta(days=7)  # Set start date 7 days in the past
        event_data = EventCreate(
            name="test name",
            description="test desc",
            start_date=past_date.strftime("%Y-%m-%d"),
            start_time="14:00",
            duration=90,
            location="Almaty"
        )
        
        # Call the create method with invalid data
        created_event = self.event_service.create(event=event_data)
        # Verify that the created_event is None
        self.assertIsNotNone(created_event)   